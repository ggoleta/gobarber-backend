import { getMongoRepository, MongoRepository } from 'typeorm';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private notificationRepository: MongoRepository<Notification>;

  constructor() {
    this.notificationRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = await this.notificationRepository.create({
      content,
      recipient_id,
    });

    await this.notificationRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
