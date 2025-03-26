

<h1>Fixed Asset Management System</h1>
<p><strong>Spring Boot & Vue.js | Cloud-based Web Application for Asset Management</strong></p>

<h2>🌟 Project Overview</h2>
<p>This is a full-stack <strong>Fixed Asset Management System</strong> built with <strong>Spring Boot</strong> and <strong>Vue.js</strong>, designed for managing fixed assets within facilities. The system includes:</p>
<ul>
  <li>Purchase and maintenance record management</li>
  <li>Asset write-off tracking</li>
  <li>Status monitoring and reporting</li>
</ul>
<p>The system is <strong>cloud-based</strong>, significantly reducing IT infrastructure costs and improving usability, with no installation required.</p>

<!--<p>🔗 <strong><a href="https://felix-fixedasset.web.app/login" target="_blank">Online Demo</a></strong></p>-->
<p>Due of temporary maintenance the demo website, please using same username and password to login to <strong><a href="https://fixedasset-prod-felix9611-d3fc9544.koyeb.app/login" target="_blank">🔗 Nest.Js + Angular version</a></strong></p>
0
<p><strong>Username:</strong> <code>Demo</code><br>
<strong>Password:</strong> <code>888888</code></p>
<p><em>Note: Backend & Database hosted on Koyeb, Frontend on Firebase. Initial data load may take a few seconds. If cannot load the verification code, please click the "Reset" button.</em></p>

<h2>📸 Example Screenshots</h2>

<h3>Dashboard Overview</h3>
<img src="https://github.com/felix9611/springboot-fixedasset-vue-2/blob/main/image/fixedasset-1.png" alt="Dashboard Overview">

<h3>Asset List View</h3>
<img src="https://github.com/felix9611/springboot-fixedasset-vue-2/blob/main/image/fixedasset-2.png" alt="Asset List View">

<h3>Asset Maintenance Records</h3>
<img src="https://github.com/felix9611/springboot-fixedasset-vue-2/blob/main/image/fixedasset-3.png" alt="Maintenance Records">

<h3>Asset Write-Off Management</h3>
<img src="https://github.com/felix9611/springboot-fixedasset-vue-2/blob/main/image/fixedasset-4.png" alt="Write-Off Management">

<h2>🚀 Key Features</h2>
<ul>
  <li><strong>Comprehensive Asset Management:</strong> Manage asset status, purchase records, maintenance schedules, and write-offs.</li>
  <li><strong>Secure Authentication & Authorization:</strong> Utilizes <strong>JWT tokens</strong> for enhanced security and data protection.</li>
  <li><strong>Cloud-Based Architecture:</strong> Easy deployment and access without installation, lowering operational costs.</li>
  <li><strong>Real-Time Data Visualization:</strong> Integrated <strong>Chart.js</strong> for graphical representation of asset data.</li>
</ul>

<h2>⚙️ Tech Stack</h2>
<h3>Frontend:</h3>
<ul>
  <li>Vue 2.6.10</li>
  <li>Node.js 16.20</li>
  <li>Typescript</li>
  <li>Tailwind CSS</li>
  <li>Chart.js 2.9.3</li>
  <li>xlsx, jspdf for reporting and data export</li>
</ul>
<h3>Backend:</h3>
<ul>
  <li>Spring Boot 2.4.13</li>
  <li>MyBatis 3.4.1 for database interaction</li>
  <li>MySQL v8</li>
  <li>Spring-Doc OpenAPI UI 1.6.15 for API documentation</li>
</ul>

<h2>🛠️ Core Functionalities</h2>
<ul>
  <li><strong>Asset Registration & Tracking:</strong> Record and track fixed assets with detailed status and information.</li>
  <li><strong>Expenditure & Maintenance Management:</strong> Log asset purchase, maintenance, and write-off records for better financial control.</li>
  <li><strong>Dynamic Reporting:</strong> Showing chart graphs and generate PDF and Excel reports for easy analysis and sharing.</li>
</ul>

<h2>📋 How to Run the Project</h2>

<h3>Backend</h3>
<pre><code>// Go to the backend's file directory
cd backend-java

// Install dependencies using maven
mvn install
// or
mvn clean install -X

// Run the backend
mvn spring-boot:run

// Packing the backend
mvn package

// API Documentation URL
http://localhost:8350/swagger-ui.html
</code></pre>

<h3>Frontend</h3>
<pre><code>// Go to the frontend's file directory
cd frontend-ts-class

// Install dependencies (npm)
npm run install

// Or install dependencies (yarn)
yarn install

// Run the frontend
npm run start
// or
yarn start

// Build the frontend
npm run build
</code></pre>

<h2>🌐 Deployment</h2>
<ul>
  <li><strong>Datebase & Backend:</strong> <del>Koyeb</del>  AWS Clouds(From Mar 24, 2025)</li>
  <li><strong>Frontend:</strong> Firebase Hosting</li>
</ul>

<h2>📈 Business Impact</h2>
<ul>
  <li><strong>Reduced Operational Costs</strong> by eliminating the need for desktop installations.</li>
  <li><strong>Improved Data Security</strong> through JWT-based user authentication.</li>
  <li><strong>Enhanced Decision-Making</strong> with real-time data visualization and comprehensive reporting.</li>
</ul>
