/* global Office console */

export async function insertText(text) {
    try {
        Office.context.mailbox.item.body.getAsync(Office.CoercionType.Text, async (result) => {
            if (result.status === Office.AsyncResultStatus.Succeeded) {
                const emailBodyText = result.value;

                const item = Office.context.mailbox.item;

                // Get From email address
                const fromEmail = item.from ? item.from.emailAddress : '';

                // Get To email addresses (returns an array)
                const toEmails = item.to ? item.to.map(recipient => recipient.emailAddress) : [];

                const payload = {
                    FromEmail: fromEmail,
                    ToEmails: toEmails,
                    messageId: item.internetMessageId,
                    subject: item.subject,
                    attachments: item.attachments?.map(att => ({
                        id: att.id,
                        name: att.name,
                        size: att.size,
                        type: att.attachmentType,
                        isInline: att.isInline
                    })),
                    body: emailBodyText
                };

                try {
                    await fetch("http://localhost:5001/api/emailbody", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(payload)
                    });
                } catch (apiErr) {
                    console.log("Failed to send email data to backend:", apiErr);
                }

                Office.context.mailbox.item?.body.setSelectedDataAsync(
                    text,
                    { coercionType: Office.CoercionType.Text },
                    (asyncResult) => {
                        if (asyncResult.status === Office.AsyncResultStatus.Failed) {
                            console.log("Failed to insert text:", asyncResult.error.message);
                        }
                    }
                );
            } else {
                console.log("Failed to read email body:", result.error.message);
            }
        });
    } catch (error) {
        console.log("Error: " + error);
    }
}