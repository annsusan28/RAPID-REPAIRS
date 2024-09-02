export function generateServiceProviderBookedEmail(data: {
  customerName: string;
  serviceType: string;
  serviceProviderName: string;
  serviceProviderEmail: string;
  serviceProviderPhone: string;
}): string {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Service Provider Booked</title>
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
    </style>
    </head>
    <body>
    <div class="container">
      <div class="header">
        <h1>${data.serviceType} Booked</h1>
      </div>
      <div class="content">
        <p>Dear <span>${data.customerName}</span>,</p>
        <p>We are pleased to inform you that a service provider has been successfully booked. Below are the details:</p>
        <div class="details">
          <p><span>Service Provider:</span> ${data.serviceProviderName}</p>
          <p><span>Email:</span> ${data.serviceProviderEmail}</p>
          <p><span>Phone:</span> ${data.serviceProviderPhone}</p>
        </div>
        <p>The status of this booking is: <strong>Booked</strong>.</p>
        <p>Thank you for using our services!</p>
      </div>
      <div class="footer">
        <p>&copy; 2024 Rapid Repairs. All rights reserved.</p>
      </div>
    </div>
    </body>
    </html>`;
}
