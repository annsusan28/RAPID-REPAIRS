export function generateJobCompletionEmail(data: {
  customerName: string;
  serviceProviderName: string;
  serviceType: string;
  feedbackLink: string;
}): string {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Completed</title>
    <style>
    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f5f5f5;
        margin: 0;
        padding: 0;
        color: #333;
    }
    .container {
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        font-size: 16px;
    }
    .header {
        background-color: #4CAF50;
        color: white;
        padding: 20px;
        text-align: center;
        text-transform: capitalize;
    }
    .content {
        padding: 20px;
        line-height: 1.6;
    }
    .footer {
        background-color: #f1f1f1;
        color: #666;
        text-align: center;
        padding: 10px;
        font-size: 14px;
    }
    .details {
        margin: 20px 0;
    }
    .details p {
        margin: 5px 0;
    }
    .details span {
        font-weight: 600;
    }
    .button {
        display: inline-block;
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
    }
    </style>
    </head>
    <body>
    <div class="container">
        <div class="header">
        <h1>${data.serviceType} Completed</h1>
        </div>
      <div class="content">
      <p>Dear <span>${data.customerName}</span>,</p>
      <p>We are pleased to inform you that the ${data.serviceType} job has been successfully completed by Service Provider: ${data.serviceProviderName}.</p>
      <p>We hope you are satisfied with the service provided. If you have any feedback, please do not hesitate to let us know.</p>
      <a href="${data.feedbackLink}" class="button">Leave Feedback</a>
      </div>
    <div class="footer">
    <p>&copy; 2024 Rapid Repairs. All rights reserved.</p>
    </div>
    </div>
    </body>
    </html>`;
}
