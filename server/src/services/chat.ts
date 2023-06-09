import { IChat, IMessage } from '@/interfaces/messaging';
import mongoose, { Model } from 'mongoose';

export default class ChatService {
  constructor(
    private chatModel: Model<IChat>,
    private messageModel: Model<IMessage>,
  ) {}

  public async createChat(
    senderId: string,
    receiverId: string,
    assistanceId: string,
    message: string,
  ) {
    const session = await mongoose.connection.startSession();

    let chat: IChat | undefined;
    await session.withTransaction(async () => {
      try {
        const [newChat] = await this.chatModel.create(
          [
            {
              members: [senderId, receiverId],
              assistance: assistanceId,
            },
          ],
          { session },
        );
        if (!newChat) {
          throw new Error('Could not create chat');
        }
        await this.messageModel.create(
          [
            {
              chatId: newChat._id,
              text: message,
              senderId,
            },
          ],
          { session },
        );
        chat = newChat;
      } catch (error) {
        await session.abortTransaction();
      } finally {
        await session.commitTransaction();
        session.endSession();
      }
    });
    return chat as IChat | undefined;
  }

  public async getUserChats(userId: string) {
    const chats = await this.chatModel
      .find({
        members: { $in: [userId] },
      })
      .populate('assistance');
    return chats;
  }

  public async chatExists(chatId: string, userId: string) {
    try {
      const chat = await this.chatModel.findById(chatId);

      return !!chat && chat.members.includes(userId);
    } catch {
      return false;
    }
  }
}
