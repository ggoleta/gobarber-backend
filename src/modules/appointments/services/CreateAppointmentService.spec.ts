import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('Appointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '12341234',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12341234');
  });

  it('should not be able to create two appointments in the same date/time', async () => {
    const currentDate = new Date();

    await createAppointment.execute({
      date: currentDate,
      provider_id: '12341234',
    });

    expect(
      createAppointment.execute({
        date: currentDate,
        provider_id: '12341234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
