// mailer.test.ts
import { sendEmail} from "../utils/Mailer";
import nodemailer from 'nodemailer';

// Creating a mock function for `nodemailer.createTransport().sendMail()`
const mockSendMail = jest.fn(() => Promise.resolve(true));
jest.mock('nodemailer', () => ({
    createTransport: jest.fn(() => ({
        sendMail: mockSendMail,
    })),
}));

describe('sendEmail', () => {
    it('should send an email', async () => {

        await sendEmail('test@example.com', 'Test', 'Hello, world!');

        // Assert `sendMail()` called with correct arguments
        expect(mockSendMail).toHaveBeenCalledWith({
            from: 'your-email@gmail.com',
            to: 'test@example.com',
            subject: 'Test',
            text: 'Hello, world!',
        });
    });
});;


