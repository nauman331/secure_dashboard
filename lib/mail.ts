
import nodemailer from "nodemailer";

const SMTP_EMAIL = process.env.SMTP_EMAIL;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const FRONTEND_URL = process.env.FRONTEND_URL;

if (!SMTP_EMAIL || !SMTP_PASSWORD || !FRONTEND_URL) {
    throw new Error(
        "Missing SMTP_EMAIL, SMTP_PASSWORD, or FRONTEND_URL environment variable."
    );
}

const frontendUrl = new URL(FRONTEND_URL);

if (!["http:", "https:"].includes(frontendUrl.protocol)) {
    throw new Error("FRONTEND_URL must use HTTP or HTTPS.");
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
    },
});

const escapeHtml = (value: string): string =>
    value.replace(/[&<>"']/g, (char) => {
        const entities: Record<string, string> = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
        };

        return entities[char];
    });

export const sendVerificationEmail = async (
    email: string,
    token: string
): Promise<void> => {
    const verificationUrl = new URL(
        "/new-verification",
        frontendUrl.origin
    );

    verificationUrl.searchParams.set("token", token);

    const confirmLink = verificationUrl.toString();

    const safeEmail = escapeHtml(email);
    const safeLink = escapeHtml(confirmLink);

    try {
        await transporter.sendMail({
            from: {
                name: "EduPak",
                address: SMTP_EMAIL,
            },
            to: email,
            subject: "Confirm your email - EduPak",

            text: `Welcome to EduPak!

Please verify your email address by opening this link:

${confirmLink}

If you did not create an account, you can ignore this email.`,

            html: `
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8" />
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1.0"
                        />
                        <title>Verify your email - EduPak</title>
                    </head>

                    <body
                        style="
                            margin: 0;
                            padding: 24px;
                            background-color: #f3f4f6;
                            font-family: Arial, sans-serif;
                            color: #1f2937;
                        "
                    >
                        <div
                            style="
                                max-width: 520px;
                                margin: 0 auto;
                                padding: 32px;
                                background-color: #ffffff;
                                border-radius: 12px;
                            "
                        >
                            <h2 style="color: #4f46e5;">
                                Welcome to EduPak!
                            </h2>

                            <p>Hello ${safeEmail},</p>

                            <p>
                                Thank you for creating an account.
                                Please verify your email address
                                by clicking the button below.
                            </p>

                            <p style="margin: 28px 0;">
                                <a
                                    href="${safeLink}"
                                    style="
                                        display: inline-block;
                                        padding: 12px 24px;
                                        background-color: #4f46e5;
                                        color: #ffffff;
                                        text-decoration: none;
                                        border-radius: 6px;
                                        font-weight: bold;
                                    "
                                >
                                    Verify Email
                                </a>
                            </p>

                            <p>
                                If the button does not work, copy
                                and paste this link into your browser:
                            </p>

                            <p style="word-break: break-all;">
                                <a href="${safeLink}">
                                    ${safeLink}
                                </a>
                            </p>

                            <p>
                                If you did not create an account,
                                you can safely ignore this email.
                            </p>

                            <hr
                                style="
                                    margin: 28px 0;
                                    border: none;
                                    border-top: 1px solid #e5e7eb;
                                "
                            />

                            <p
                                style="
                                    font-size: 12px;
                                    color: #6b7280;
                                "
                            >
                                © EduPak. All rights reserved.
                            </p>
                        </div>
                    </body>
                </html>
            `,
        });

        console.log(`Verification email sent to ${email}`);
    } catch (error: unknown) {
        console.error("Error sending verification email:", error);

        throw new Error("Failed to send verification email.", {
            cause: error,
        });
    }
};