import type { Db } from "../db/database.ts";
import type { ApplicationDbo } from "../models/application.ts";

interface ApplicationKey {
  offerId: number;
  studentId: number;
}

interface ApplicationValues extends ApplicationKey {
  message: string | null;
}

export const createApplicationsRepository = (db: Db) => {
  const findOfferStatus = db.prepare<{ offerId: number }, { status: string }>(
    "SELECT status FROM offers WHERE id = @offerId",
  );
  const findExisting = db.prepare<ApplicationKey, ApplicationDbo>(`
    SELECT a.id, a.offer_id, o.title AS offer_title, c.short_name AS company_short_name,
           o.status AS offer_status,
           ay.label AS academic_year_label, p.code AS period_code,
           a.student_id, a.message, a.status, a.applied_at
    FROM applications a
    JOIN offers o ON o.id = a.offer_id
    JOIN companies c ON c.id = o.company_id
    JOIN academic_years ay ON ay.id = o.academic_year_id
    JOIN periods p ON p.id = o.period_id
    WHERE a.offer_id = @offerId AND a.student_id = @studentId
  `);
  const findByStudent = db.prepare<{ studentId: number }, ApplicationDbo>(`
    SELECT a.id, a.offer_id, o.title AS offer_title, c.short_name AS company_short_name,
           o.status AS offer_status,
           ay.label AS academic_year_label, p.code AS period_code,
           a.student_id, a.message, a.status, a.applied_at
    FROM applications a
    JOIN offers o ON o.id = a.offer_id
    JOIN companies c ON c.id = o.company_id
    JOIN academic_years ay ON ay.id = o.academic_year_id
    JOIN periods p ON p.id = o.period_id
    WHERE a.student_id = @studentId
    ORDER BY a.applied_at DESC, a.id DESC
  `);
  const insert = db.prepare<ApplicationValues>(`
    INSERT INTO applications (offer_id, student_id, message)
    VALUES (@offerId, @studentId, @message)
  `);
  const reactivate = db.prepare<ApplicationValues>(`
    UPDATE applications
    SET message = @message, status = 'IN_PROGRESS', applied_at = datetime('now')
    WHERE offer_id = @offerId AND student_id = @studentId AND status = 'WITHDRAWN'
  `);

  const createOrReactivate = db.transaction((values: ApplicationValues) => {
    const offer = findOfferStatus.get({ offerId: values.offerId });
    if (offer === undefined) {
      throw new Error("Offer must be checked before creating an application");
    }

    const existing = findExisting.get(values);
    if (existing?.status === "WITHDRAWN") {
      reactivate.run(values);
      return { application: findExisting.get(values) as ApplicationDbo, exists: false };
    }
    if (existing !== undefined) {
      return { application: existing, exists: true };
    }

    insert.run(values);
    return { application: findExisting.get(values) as ApplicationDbo, exists: false };
  });

  return {
    findByStudent: (studentId: number): ApplicationDbo[] => findByStudent.all({ studentId }),
    findOfferStatus: (offerId: number): string | undefined =>
      findOfferStatus.get({ offerId })?.status,
    findByOfferAndStudent: (offerId: number, studentId: number): ApplicationDbo | undefined =>
      findExisting.get({ offerId, studentId }),
    createOrReactivate,
  };
};

export type ApplicationsRepository = ReturnType<typeof createApplicationsRepository>;
