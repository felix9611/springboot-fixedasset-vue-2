# Fixedasset SYSTEM BY Springboot & VUE

Springboot X VUE For MySQL
------------
<div>
・Inclubes frontend and backend for Fixed Assets Management System<br />
・Management purchase expenditure record ,maintenance and write-off records in fixed assets at facilities<br />
・Cloud-based web systems offer ease of use with no installation required, significantly reducing costs.<br />
・Use JWT tokens for user authentication and authorization, ensuring security and protection of fixed assets data.<br />
・Manage fixed assets, including status tracking, information recording, equipment purchase records, write-offs, and maintenance, within facility settings.<br />
</div>

<div>
Language:<br />
------------
・Java8 (Some dependencies only run on Java8)<br />
・Node.js 16.20 (Frontend).<br />
・Typescript<br />
・Vue2<br />
・Tailwind<br />
</div><br />

Core:<br />
------------
・Spring boot 2.4.13<br />
・Mybatis 3.4.1<br />
・Vue 2.6.10<br />
・moment 2.29.1<br />
・MySQL V8<br />
<br />
Component:<br />
------------
・ChartJs 2.9.3<br />
・jspdf 2.5.1<br />
・xlsx ^0.18.2<br />
・xlsx-style ^0.8.13<br />
・OpenAI<br />
<br />

Example Image<br />
------------
<img src="/image/fixedasset-1.png"><br />
<img src="/image/fixedasset-2.png"><br />
<img src="/image/fixedasset-3.png"><br />
<img src="/image/fixedasset-4.png"><br />


How to run this project<br />
------------
Backend using port 8350<br />
Frontend using port 8080<br />

Backend<br />

~~~
// Go to the backend's file directory
cd java-backend

// Install dependencies using maven
mvn install
//or
mvn clean install -X

// Run the backend
mvn spring-boot:run

// Packing the backend
mvn package
~~~
<br />

Frontend<br />

~~~
// Go to the backend's file directory
cd frontend-ts-class

// Install dependencies if using npm
npm run install

// Install dependencies if using yarn
yarn install

// Run the frontend
npm run start
yarn start

// Build the frontend
npm run build
~~~
<br />