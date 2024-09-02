import mysql from "mysql2/promise";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { fakerEN_IN as faker } from "@faker-js/faker";

dotenv.config();

const NUM_ENTRIES = 10;

const getRandomCityAndDistrict = () => {
  const districts = {
    Alappuzha: [
      "Alappuzha Town",
      "Ambalappuzha",
      "Cherthala",
      "Haripad",
      "Kayamkulam",
      "Mavelikkara",
      "Chengannur",
      "Thiruvalla",
      "Karthikappally",
      "Muhamma",
      "Punnapra",
      "Thanneermukkom",
      "Chennam Pallipuram",
      "Thakazhi",
      "Ramankary",
    ],
    Ernakulam: [
      "Kochi",
      "Aluva",
      "Kothamangalam",
      "Perumbavoor",
      "Muvattupuzha",
      "Angamaly",
      "North Paravur",
      "Thrippunithura",
      "Kakkanad",
      "Kalamassery",
      "Mattancherry",
      "Cherai",
      "Thiruvankulam",
      "Koothattukulam",
      "Piravom",
    ],
    Idukki: [
      "Munnar",
      "Thodupuzha",
      "Idukki",
      "Adimali",
      "Nedumkandam",
      "Painavu",
      "Kattappana",
      "Vandiperiyar",
      "Rajakkad",
      "Udumbanchola",
      "Devikulam",
      "Kumily",
      "Peerumedu",
      "Elappara",
    ],
    Kannur: [
      "Kannur",
      "Thalassery",
      "Payyannur",
      "Kasaragod",
      "Kuthuparamba",
      "Iritty",
      "Mattannur",
      "Panoor",
      "Taliparamba",
      "Peringathur",
      "Kanhirode",
      "Keezhallur",
      "Kunhimangalam",
      "Munderi",
    ],
    Kasaragod: [
      "Kasaragod",
      "Kanhangad",
      "Nileshwar",
      "Cheruvathur",
      "Manjeswaram",
      "Bekal",
      "Udma",
      "Kumbla",
      "Padanna",
      "Narampady",
      "Pallikkara",
      "Koippadu",
      "Kumbala",
    ],
    Kollam: [
      "Kollam",
      "Punalur",
      "Karunagappally",
      "Kottarakkara",
      "Chavara",
      "Paravur",
      "Kunnathur",
      "Pathanapuram",
      "Sasthamkotta",
      "Oachira",
      "Chadayamangalam",
      "Kottiyam",
      "Kundara",
      "Eravipuram",
    ],
    Kottayam: [
      "Kottayam",
      "Changanassery",
      "Pala",
      "Kanjirappally",
      "Vaikom",
      "Ettumanoor",
      "Thiruvalla",
      "Chingavanam",
      "Kuravilangad",
      "Neendoor",
      "Puthuppally",
      "Kanjikkuzhi",
      "Manimala",
    ],
    Kozhikode: [
      "Kozhikode",
      "Koyilandy",
      "Vadakara",
      "Feroke",
      "Perambra",
      "Mavoor",
      "Kunnamangalam",
      "Ramanattukara",
      "Thamarassery",
      "Koduvally",
      "Beypore",
      "Kodanchery",
      "Thalakulathur",
    ],
    Malappuram: [
      "Malappuram",
      "Manjeri",
      "Ponnani",
      "Tirur",
      "Perinthalmanna",
      "Cherpulassery",
      "Kottakkal",
      "Nilambur",
      "Tanur",
      "Parappanangadi",
      "Wandoor",
      "Edappal",
      "Valanchery",
      "Vengara",
    ],
    Palakkad: [
      "Palakkad",
      "Ottapalam",
      "Chittur-Thathamangalam",
      "Alathur",
      "Mannarkkad",
      "Shoranur",
      "Cherpulassery",
      "Kongad",
      "Pattambi",
      "Thrithala",
      "Kuzhalmannam",
      "Kollengode",
      "Parli",
      "Nemmara",
    ],
    Pathanamthitta: [
      "Thiruvalla",
      "Adoor",
      "Pathanamthitta",
      "Pandalam",
      "Kozhencherry",
      "Ranni",
      "Konni",
      "Mallappally",
      "Aranmula",
      "Kadapra",
      "Niranam",
      "Thadiyoor",
      "Kumbanad",
      "Kunnamthanam",
    ],
    Thiruvananthapuram: [
      "Thiruvananthapuram",
      "Neyyattinkara",
      "Attingal",
      "Nedumangad",
      "Varkala",
      "Kattakada",
      "Nemom",
      "Kovalam",
      "Pothencode",
      "Parassala",
      "Vattiyoorkavu",
      "Vellanad",
      "Kudappanakunnu",
      "Kazhakoottam",
      "Vizhinjam",
    ],
    Thrissur: [
      "Thrissur",
      "Kodungallur",
      "Chalakudy",
      "Kunnamkulam",
      "Guruvayur",
      "Irinjalakuda",
      "Wadakkanchery",
      "Chavakkad",
      "Thriprayar",
      "Mala",
      "Mukundapuram",
      "Mulankunnathukavu",
    ],
    Wayanad: [
      "Kalpetta",
      "Mananthavady",
      "Sulthan Bathery",
      "Vythiri",
      "Panamaram",
      "Meppadi",
      "Pulpally",
      "Kaniyambetta",
      "Thariode",
      "Vellamunda",
      "Nenmeni",
      "Muttil",
      "Mullankolli",
      "Muppathadom",
      "Padichira",
    ],
  };
  const districtKeys = Object.keys(districts);
  const randomDistrict =
    districtKeys[Math.floor(Math.random() * districtKeys.length)];
  const randomCity =
    districts[randomDistrict][
      Math.floor(Math.random() * districts[randomDistrict].length)
    ];

  return { city: randomCity, district: randomDistrict };
};

const getRandomServiceType = (): string => {
  const serviceTypes = [
    "plumbing",
    "electrical",
    "carpentry",
    "cleaning",
    "roofing",
    "painting",
  ];
  const randomIndex = Math.floor(Math.random() * serviceTypes.length);
  return serviceTypes[randomIndex];
};

const createRandomPassword = async () => {
  const password = faker.internet.password();
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const generatePhoneNumber = () => {
  return faker.phone.number("##########"); // Generates a 10-digit phone number
};

const migrate = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const createTableQuery = `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      userType ENUM('admin', 'customer','service_provider') DEFAULT 'customer',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`;

  const createCustomerDetailsTableQuery = `CREATE TABLE IF NOT EXISTS customer_details (
   customer_id INT AUTO_INCREMENT PRIMARY KEY,
   user_id INT NOT NULL,
   name VARCHAR(50),
   email VARCHAR(100) UNIQUE,
   phone VARCHAR(20),
   address TEXT,
   status ENUM('active', 'inactive') DEFAULT NULL,
   CONSTRAINT fk_customer_details_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );`;

  const createServiceProviderDetailsTableQuery = `
  CREATE TABLE IF NOT EXISTS service_provider_details (
   service_provider_id INT AUTO_INCREMENT PRIMARY KEY,
   user_id INT NOT NULL,
   name VARCHAR(50),
   email VARCHAR(100) UNIQUE,
   role VARCHAR(50),
   service_type ENUM('plumbing', 'electrical', 'carpentry', 'cleaning', 'roofing', 'painting') NOT NULL,
   years_of_experience INT,
   birth_date DATE,
   city ENUM(
        'Alappuzha Town', 'Ambalappuzha', 'Cherthala', 'Haripad', 'Kayamkulam', 'Mavelikkara', 'Chengannur', 'Karthikappally', 'Muhamma', 'Punnapra', 'Thanneermukkom', 'Chennam Pallipuram', 'Thakazhi', 'Ramankary',
        'Kochi', 'Aluva', 'Kothamangalam', 'Perumbavoor', 'Muvattupuzha', 'Angamaly', 'North Paravur', 'Thrippunithura', 'Kakkanad', 'Kalamassery', 'Mattancherry', 'Cherai', 'Thiruvankulam', 'Koothattukulam', 'Piravom',
        'Munnar', 'Thodupuzha', 'Idukki', 'Adimali', 'Nedumkandam', 'Painavu', 'Kattappana', 'Vandiperiyar', 'Rajakkad', 'Udumbanchola', 'Devikulam', 'Kumily', 'Peerumedu', 'Elappara',
        'Kannur', 'Thalassery', 'Payyannur', 'Kuthuparamba', 'Iritty', 'Mattannur', 'Panoor', 'Taliparamba', 'Peringathur', 'Kanhirode', 'Keezhallur', 'Kunhimangalam', 'Munderi',
        'Kasaragod', 'Kanhangad', 'Nileshwar', 'Cheruvathur', 'Manjeswaram', 'Bekal', 'Udma', 'Kumbla', 'Padanna', 'Narampady', 'Pallikkara', 'Koippadu', 'Kumbala',
        'Kollam', 'Punalur', 'Karunagappally', 'Kottarakkara', 'Chavara', 'Paravur', 'Kunnathur', 'Pathanapuram', 'Sasthamkotta', 'Oachira', 'Chadayamangalam', 'Kottiyam', 'Kundara', 'Eravipuram',
        'Kottayam', 'Changanassery', 'Pala', 'Kanjirappally', 'Vaikom', 'Ettumanoor', 'Chingavanam', 'Kuravilangad', 'Neendoor', 'Puthuppally', 'Kanjikkuzhi', 'Manimala',
        'Kozhikode', 'Koyilandy', 'Vadakara', 'Feroke', 'Perambra', 'Mavoor', 'Kunnamangalam', 'Ramanattukara', 'Thamarassery', 'Koduvally', 'Beypore', 'Kodanchery', 'Thalakulathur',
        'Malappuram', 'Manjeri', 'Ponnani', 'Tirur', 'Perinthalmanna', 'Cherpulassery', 'Kottakkal', 'Nilambur', 'Tanur', 'Parappanangadi', 'Wandoor', 'Edappal', 'Valanchery', 'Vengara',
        'Palakkad', 'Ottapalam', 'Chittur-Thathamangalam', 'Alathur', 'Mannarkkad', 'Shoranur', 'Kongad', 'Pattambi', 'Thrithala', 'Kuzhalmannam', 'Kollengode', 'Parli', 'Nemmara',
        'Thiruvalla', 'Adoor', 'Pathanamthitta', 'Pandalam', 'Kozhencherry', 'Ranni', 'Konni', 'Mallappally', 'Aranmula', 'Kadapra', 'Niranam', 'Thadiyoor', 'Kumbanad', 'Kunnamthanam',
        'Thiruvananthapuram', 'Neyyattinkara', 'Attingal', 'Nedumangad', 'Varkala', 'Kattakada', 'Nemom', 'Kovalam', 'Pothencode', 'Parassala', 'Vattiyoorkavu', 'Vellanad', 'Kudappanakunnu', 'Kazhakoottam', 'Vizhinjam',
        'Thrissur', 'Kodungallur', 'Chalakudy', 'Kunnamkulam', 'Guruvayur', 'Irinjalakuda', 'Wadakkanchery', 'Chavakkad', 'Thriprayar', 'Mala', 'Mukundapuram', 'Mulankunnathukavu',
        'Kalpetta', 'Mananthavady', 'Sulthan Bathery', 'Vythiri', 'Panamaram', 'Meppadi', 'Pulpally', 'Kaniyambetta', 'Thariode', 'Vellamunda', 'Nenmeni', 'Muttil', 'Mullankolli', 'Muppathadom', 'Padichira'),
   qualification VARCHAR(100),
   district ENUM(
        'Alappuzha',
        'Ernakulam',
        'Idukki',
        'Kannur',
        'Kasaragod',
        'Kollam',
        'Kottayam',
        'Kozhikode',
        'Malappuram',
        'Palakkad',
        'Pathanamthitta',
        'Thiruvananthapuram',
        'Thrissur',
        'Wayanad'),
   phone_no VARCHAR(20),
   latitude DECIMAL(9, 6),
   longitude DECIMAL(9, 6),
   status ENUM('active', 'inactive') DEFAULT NULL,
   average_rating DECIMAL(2, 1) DEFAULT 0,
   CONSTRAINT fk_service_provider_details_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );`;

  const createJobTableQuery = `CREATE TABLE IF NOT EXISTS jobs (
    job_id INT AUTO_INCREMENT PRIMARY KEY,
    status ENUM('draft', 'booked', 'complete') DEFAULT 'draft',
    service_type ENUM('plumbing', 'electrical', 'carpentry', 'cleaning', 'roofing', 'painting') NOT NULL,
    assigned_to_user INT,
    created_by_user INT,
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6),
    district ENUM(
        'Alappuzha',
        'Ernakulam',
        'Idukki',
        'Kannur',
        'Kasaragod',
        'Kollam',
        'Kottayam',
        'Kozhikode',
        'Malappuram',
        'Palakkad',
        'Pathanamthitta',
        'Thiruvananthapuram',
        'Thrissur',
        'Wayanad'),
        city ENUM(
        'Alappuzha Town', 'Ambalappuzha', 'Cherthala', 'Haripad', 'Kayamkulam', 'Mavelikkara', 'Chengannur', 'Karthikappally', 'Muhamma', 'Punnapra', 'Thanneermukkom', 'Chennam Pallipuram', 'Thakazhi', 'Ramankary',
        'Kochi', 'Aluva', 'Kothamangalam', 'Perumbavoor', 'Muvattupuzha', 'Angamaly', 'North Paravur', 'Thrippunithura', 'Kakkanad', 'Kalamassery', 'Mattancherry', 'Cherai', 'Thiruvankulam', 'Koothattukulam', 'Piravom',
        'Munnar', 'Thodupuzha', 'Idukki', 'Adimali', 'Nedumkandam', 'Painavu', 'Kattappana', 'Vandiperiyar', 'Rajakkad', 'Udumbanchola', 'Devikulam', 'Kumily', 'Peerumedu', 'Elappara',
        'Kannur', 'Thalassery', 'Payyannur', 'Kuthuparamba', 'Iritty', 'Mattannur', 'Panoor', 'Taliparamba', 'Peringathur', 'Kanhirode', 'Keezhallur', 'Kunhimangalam', 'Munderi',
        'Kasaragod', 'Kanhangad', 'Nileshwar', 'Cheruvathur', 'Manjeswaram', 'Bekal', 'Udma', 'Kumbla', 'Padanna', 'Narampady', 'Pallikkara', 'Koippadu', 'Kumbala',
        'Kollam', 'Punalur', 'Karunagappally', 'Kottarakkara', 'Chavara', 'Paravur', 'Kunnathur', 'Pathanapuram', 'Sasthamkotta', 'Oachira', 'Chadayamangalam', 'Kottiyam', 'Kundara', 'Eravipuram',
        'Kottayam', 'Changanassery', 'Pala', 'Kanjirappally', 'Vaikom', 'Ettumanoor', 'Chingavanam', 'Kuravilangad', 'Neendoor', 'Puthuppally', 'Kanjikkuzhi', 'Manimala',
        'Kozhikode', 'Koyilandy', 'Vadakara', 'Feroke', 'Perambra', 'Mavoor', 'Kunnamangalam', 'Ramanattukara', 'Thamarassery', 'Koduvally', 'Beypore', 'Kodanchery', 'Thalakulathur',
        'Malappuram', 'Manjeri', 'Ponnani', 'Tirur', 'Perinthalmanna', 'Cherpulassery', 'Kottakkal', 'Nilambur', 'Tanur', 'Parappanangadi', 'Wandoor', 'Edappal', 'Valanchery', 'Vengara',
        'Palakkad', 'Ottapalam', 'Chittur-Thathamangalam', 'Alathur', 'Mannarkkad', 'Shoranur', 'Kongad', 'Pattambi', 'Thrithala', 'Kuzhalmannam', 'Kollengode', 'Parli', 'Nemmara',
        'Thiruvalla', 'Adoor', 'Pathanamthitta', 'Pandalam', 'Kozhencherry', 'Ranni', 'Konni', 'Mallappally', 'Aranmula', 'Kadapra', 'Niranam', 'Thadiyoor', 'Kumbanad', 'Kunnamthanam',
        'Thiruvananthapuram', 'Neyyattinkara', 'Attingal', 'Nedumangad', 'Varkala', 'Kattakada', 'Nemom', 'Kovalam', 'Pothencode', 'Parassala', 'Vattiyoorkavu', 'Vellanad', 'Kudappanakunnu', 'Kazhakoottam', 'Vizhinjam',
        'Thrissur', 'Kodungallur', 'Chalakudy', 'Kunnamkulam', 'Guruvayur', 'Irinjalakuda', 'Wadakkanchery', 'Chavakkad', 'Thriprayar', 'Mala', 'Mukundapuram', 'Mulankunnathukavu',
        'Kalpetta', 'Mananthavady', 'Sulthan Bathery', 'Vythiri', 'Panamaram', 'Meppadi', 'Pulpally', 'Kaniyambetta', 'Thariode', 'Vellamunda', 'Nenmeni', 'Muttil', 'Mullankolli', 'Muppathadom', 'Padichira'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_to_user) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by_user) REFERENCES users(id) ON DELETE CASCADE
    );`;

  const createFeedbackTableQuery = `CREATE TABLE IF NOT EXISTS feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT NOT NULL,
    service_provider_id INT NOT NULL,
    customer_id INT NOT NULL,
    feedback TEXT NOT NULL,
    star_rating INT NOT NULL CHECK (star_rating BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(job_id) ON DELETE CASCADE,
    FOREIGN KEY (service_provider_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE
);`;

  const insertAdminUserQuery = `
    INSERT INTO users (name, email, password, userType)
    VALUES (?, ?, ?, 'admin')
  `;
  const insertCustomerUserQuery = `
    INSERT INTO users (name, email, password, userType)
    VALUES (?, ?, ?, 'customer')
  `;
  const insertServiceProviderUserQuery = `
    INSERT INTO users (name, email, password, userType)
    VALUES (?, ?, ?, 'service_provider')
  `;

  const insertCustomerUserDetailsQuery = `
    INSERT INTO customer_details (user_id, name, email, phone, address, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const insertServiceProviderUserDetailsQuery = `
    INSERT INTO service_provider_details (user_id, name, email, role, service_type, years_of_experience, birth_date, city, qualification, district, phone_no, latitude, longitude, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'inactive')
  `;

  const insertFeedbackQuery = `
    INSERT INTO feedback (service_provider_id, customer_id, feedback, star_rating, job_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  const insertJobQuery = `
    INSERT INTO jobs (status, assigned_to_user, created_by_user, latitude, longitude, district, city, service_type)
    VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    await connection.execute(createTableQuery);
    console.log("Table `users` created successfully!");
    await connection.execute(createCustomerDetailsTableQuery);
    console.log("Table `customer_details` created successfully!");
    await connection.execute(createServiceProviderDetailsTableQuery);
    console.log("Table `service_provider_details` created successfully!");
    await connection.execute(createJobTableQuery);
    console.log("Table `jobs` created successfully!");
    await connection.execute(createFeedbackTableQuery);
    console.log("Table `feedback` created successfully!");

    const hashedAdminPassword = await bcrypt.hash("adminpassword", 10);
    await connection.execute(insertAdminUserQuery, [
      "Admin User",
      "admin@example.com",
      hashedAdminPassword,
    ]);

    // Insert static customer user
    const hashedCustomerPassword = await bcrypt.hash("customerpassword", 10);
    const [customerResult] = await connection.execute(insertCustomerUserQuery, [
      "Customer User",
      "customer@example.com",
      hashedCustomerPassword,
    ]);

    const customerUserId = (customerResult as mysql.ResultSetHeader).insertId;
    await connection.execute(insertCustomerUserDetailsQuery, [
      customerUserId,
      "Customer User",
      "customer@example.com",
      generatePhoneNumber(),
      faker.location.streetAddress(),
      "active",
    ]);

    // Insert static service provider user
    const hashedServiceProviderPassword = await bcrypt.hash(
      "servicepassword",
      10
    );
    const [serviceProviderResult] = await connection.execute(
      insertServiceProviderUserQuery,
      [
        "Service Provider User",
        "service@example.com",
        hashedServiceProviderPassword,
      ]
    );

    const serviceProviderUserId = (
      serviceProviderResult as mysql.ResultSetHeader
    ).insertId;
    const { city, district } = getRandomCityAndDistrict();
    await connection.execute(insertServiceProviderUserDetailsQuery, [
      serviceProviderUserId,
      "Service Provider User",
      "service@example.com",
      faker.person.jobTitle(),
      getRandomServiceType(),
      faker.number.int({ min: 1, max: 20 }),
      faker.date.past({ years: 30 }).toISOString().split("T")[0],
      city,
      faker.person.jobType(),
      district,
      generatePhoneNumber(),
      faker.location.latitude(),
      faker.location.longitude(),
    ]);

    for (let i = 0; i < NUM_ENTRIES; i++) {
      const hashedCustomerPassword = await createRandomPassword();
      const [customerResult] = await connection.execute(
        insertCustomerUserQuery,
        [
          faker.person.firstName() + " " + faker.person.lastName(),
          faker.internet.email(),
          hashedCustomerPassword,
        ]
      );
      const customerUserId = (customerResult as mysql.ResultSetHeader).insertId;
      await connection.execute(insertCustomerUserDetailsQuery, [
        customerUserId,
        faker.person.firstName(),
        faker.internet.email(),
        generatePhoneNumber(),
        faker.location.streetAddress(),
        "active",
      ]);

      const hashedServiceProviderPassword = await createRandomPassword();
      const [serviceProviderResult] = await connection.execute(
        insertServiceProviderUserQuery,
        [
          faker.person.firstName() + " " + faker.person.lastName(),
          faker.internet.email(),
          hashedServiceProviderPassword,
        ]
      );
      const serviceProviderUserId = (
        serviceProviderResult as mysql.ResultSetHeader
      ).insertId;

      const { city, district } = getRandomCityAndDistrict();

      await connection.execute(insertServiceProviderUserDetailsQuery, [
        serviceProviderUserId,
        faker.person.firstName(),
        faker.internet.email(),
        faker.person.jobTitle(),
        getRandomServiceType(),
        faker.number.int({ min: 1, max: 20 }),
        faker.date.past({ years: 30 }).toISOString().split("T")[0],
        city,
        faker.person.jobType(),
        district,
        generatePhoneNumber(),
        faker.location.latitude(),
        faker.location.longitude(),
      ]);

      const { city: jobCity, district: jobDistrict } =
        getRandomCityAndDistrict();

      await connection.execute(insertJobQuery, [
        "booked",
        3,
        customerUserId,
        faker.location.latitude(),
        faker.location.longitude(),
        jobDistrict,
        jobCity,
        getRandomServiceType(),
      ]);

      await connection.execute(insertFeedbackQuery, [
        serviceProviderUserId,
        customerUserId,
        faker.lorem.sentence(),
        faker.number.int({ min: 1, max: 5 }),
        (i % 2) + 1,
      ]);
    }

    console.log("Dummy data added successfully!");
  } catch (err) {
    console.error("Error creating table:", err);
  } finally {
    await connection.end();
  }
};

migrate().catch((err) => {
  console.error("Migration failed:", err);
});
