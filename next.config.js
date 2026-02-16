module.exports = {
    experimental: {
        serverActions: {
          bodySizeLimit: '10mb',
        },
      },
    env: {
        // для тестинга на локалке
        PATH_API : 'http://localhost:3000/api/',
        URL : 'http://localhost:3000',
        MYSQL_HOST : "localhost",
        MYSQL_PORT : "3306",
        MYSQL_DATABASE : 'access',
        MYSQL_USER : 'root',
        MYSQL_PASSWORD : 'password',

        // для хостинга hostDB
        //MYSQL_HOST : "127.0.0.1",
        //MYSQL_PORT : "3306",
        //MYSQL_DATABASE : 'hostDB',
        //MYSQL_USER : 'olawitche6_db',
        //MYSQL_PASSWORD : 't*vpgRx3NvpwPUmU',
        //URL : 'https://vseresepty.ru',

        PUBLIC_CLOUDINARY_URL : 'http://localhost:3000/api/upload/image',
        OUTLOOK_HOST : 'smtp-mail.outlook.com',
        OUTLOOK_USER : 'vsrecepti@outlook.com',
        OUTLOOK_PASSW : 'Gniv188Ehuy', 
        GMAIL_HOST : "smtp.gmail.com",
        GMAIL_USER : "vsrecepti@gmail.com",
        GMAIL_PASSW : "iefwbqxwertveunu",
        GMAIL_APIKEY : "AIzaSyAWALqy12Rl-AvQptHMkzvNf1Hi1PN-yDY",
        GMAIL_SERVICE : "gmail",
        MAIL_MAILRU_HOST : "smtp.mail.ru",
        MAILRU_USER  : "vsrecepti@mail.ru",
        MAILRU_PASSW : "QyadENdWFNUbr9aJiybB",
        GOOGLE_ID : '922033227155-ql5ehrkrfgjvrvtdhhnee29k2tgiqds9.apps.googleusercontent.com',
        GOOGLE_SECRET : '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',
        GITHUB_ID : '24c6658778450bfcf6b6',
        GITHUB_SECRET : '48fea279d4c83e3af5dc034693d2026d8cb116d1',
        NEXTAUTH_SECRET :'supersecret',
        NEXTAUTH_URL : 'http://localhost:3000',
        UPLOADTHING_SECRET : 'sk_live_014147a72ed47e0b09f8d6d104f2b18fecc497cdb8e056b5fda7fee7cfbac8bf',
        UPLOADTHING_APP_ID : 'q3osmntofx',
        UPLOADTHING_TOKEN : 'eyJhcGlLZXkiOiJza19saXZlXzAxNDE0N2E3MmVkNDdlMGIwOWY4ZDZkMTA0ZjJiMThmZWNjNDk3Y2RiOGUwNTZiNWZkYTdmZWU3Y2ZiYWM4YmYiLCJhcHBJZCI6InEzb3NtbnRvZngiLCJyZWdpb25zIjpbInNlYTEiXX0=',
        SMTP_PORT_TLS : "587",
        SMTP_PORT_SSL : "465",
        S3_YANDEX_ID_KEY : 'YCAJE7ezJxxAP2De0kSffYNMY',
        S3_YANDEX_SECRET_KEY : 'YCOuqtOfz_V4CWcCtrDPqjkdpOAtKEXm23xWGLkq',
        S3_YANDEX_REGION: 'ru-central1',
        S3_YANDEX_END_POINT: 'https://storage.yandexcloud.net',
        S3_YANDEX_BUCKET: 'vseresepty'
    },    

  }