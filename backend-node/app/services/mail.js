import ejs from 'ejs';
import path from 'path';
import nodemailer from 'nodemailer';
import { EMAIL, TABLES,
    MAILS_DATA as mailsDataCols ,
    ACTIVATION_LINK,
    RESET_PASSWORD_LINK
} from '../constants';
import {
    insertActivationMail,
    insertResetPasswordMail,
    updateExistingResetPasswordMails,
    updateExistingActivationMails,
} from '../services';

const cols = TABLES.ACTIVATION_MAILS.COLUMNS;

const TRANSPORT_CONFIG = {
    host: EMAIL.HOST,
    port: EMAIL.PORT,
    secure: true,
    auth: {
        user: EMAIL.ADDRESS,
        pass: EMAIL.PASSWORD,
    },
};

const transporter = nodemailer.createTransport(TRANSPORT_CONFIG);

export function sendMail(to, subject, html) {
    return new Promise(async (res, rej) => {
        transporter.sendMail({
            from: EMAIL.AUTHOR,
            to,
            subject,
            html,
        }, (error, info) => {
            if (error) {
                return rej(error);
            }
            res(info);
        });
    });
}

export function renderMailTemplate(filename, data, options) {
    return new Promise((res, rej) => {
        ejs.renderFile(
            filename,
            data,
            options,
            (error, template) => {
                if(!error) {
                    res(template);
                } else {
                    rej(error);
                }
            }
        );
    });
}

export async function renderTemplateAndSendMail(mail, mailData) {
    const link = `${mailData[mailsDataCols.LINK]}${mail.id}`;
    const header = mailData[mailsDataCols.HEADER];
    const filename = path.resolve(__dirname, mailData[mailsDataCols.TEMPLATE]);
    const data = { link };
    const options = {};
    const template = await renderMailTemplate(filename, data, options);
    return sendMail(mail[cols.EMAIL], header, template);
}

export async function repeatSendActivationMail(email) {
    await updateExistingActivationMails(email);

    const mail = await insertActivationMail({ email });

    if (process.env.NODE_ENV === 'test'){
        return Promise.resolve();
    }else{
        return renderTemplateAndSendMail(mail, {
            [mailsDataCols.HEADER]: 'Registration',
            [mailsDataCols.LINK]: ACTIVATION_LINK,
            [mailsDataCols.TEMPLATE]: '../templates/sign-up.ejs',
        });
    }
}

export async function sendActivationMail(email) {
    await updateExistingActivationMails(email);

    const mail = await insertActivationMail({ email });

    if (process.env.NODE_ENV === 'test'){
        return Promise.resolve();
    }else{
        return renderTemplateAndSendMail(mail, {
            [mailsDataCols.HEADER]: 'Registration',
            [mailsDataCols.LINK]: ACTIVATION_LINK,
            [mailsDataCols.TEMPLATE]: '../templates/sign-up.ejs',
        });
    }
}

export async function sendResetPasswordMail(email) {
    await updateExistingResetPasswordMails(email);

    const mail = await insertResetPasswordMail({ email });

    if (process.env.NODE_ENV === 'test'){
        return Promise.resolve();
    }else{
        return renderTemplateAndSendMail(mail, {
            [mailsDataCols.HEADER]: 'Reset password instructions from MBA',
            [mailsDataCols.LINK]: RESET_PASSWORD_LINK,
            [mailsDataCols.TEMPLATE]: '../templates/reset-password.ejs',
        });
    }
}
