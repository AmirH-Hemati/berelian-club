# 💎 Berelian Club

### Customer Relationship & Investment Management Platform

Berelian Club is a full-stack web application designed to manage customer relationships, service requests, and communication between customers and investment managers.

The platform provides a centralized environment for managing customer accounts, support tickets, real-time conversations, appointments, notifications, and customer-related documents.

Built with **Next.js, React, Express.js, TypeScript, MongoDB, and Socket.IO**, the project follows a Monorepo architecture with shared packages, a feature-based frontend structure, and Dependency Injection on the backend.

## 🌐 Live Applications

- **Client Application:** [Visit Berelian Club](https://berelianclub.onrender.com)
- **Admin Dashboard:** [Visit Admin Panel](https://berelianclub-admin.onrender.com)

The client and admin applications are deployed separately and communicate with the backend API.

*Note: Availability depends on the current deployment status and hosting environment.*

## ✨ Features

### 👤 Client Application

- Customer profile and account management.
- Submit and track service requests.
- Real-time conversations with administrators and managers.
- Notifications and customer updates.
- Appointment and meeting management.
- Access to meeting reports and follow-up tasks.
- Contract-related reminders and customer information management.
- Access to educational resources and related documents.

### 🛡️ Admin Dashboard

- Centralized customer management.
- Create and manage customer accounts.
- Review, approve, and manage customer requests.
- Initiate conversations after request approval.
- Manage conversations and messages.
- Coordinate appointments and meetings.
- Manage notifications and follow-up activities.
- Access customer-related information and reports.

### 🔐 Controlled Registration & OTP Authentication

Berelian Club does not support unrestricted public registration. **User accounts are created and managed by administrators through the admin dashboard.**

The authentication system uses **One-Time Password (OTP)** verification for user login.

Key aspects include:

- Administrator-controlled account creation.
- OTP-based authentication.
- Protected application routes and API endpoints.
- Cookie-based authentication for managing authenticated sessions.
- Access control for customer-related resources.

This approach allows the platform to maintain controlled access to customer services and sensitive information.

### 💬 Real-Time Ticketing & Messaging

The platform includes a request and ticket-based communication workflow powered by **WebSockets using Socket.IO**.

Key capabilities include:

- Customers submit service requests.
- Administrators review and approve requests.
- Approved requests can initiate conversations.
- Customers and administrators exchange messages in real time.
- New messages are delivered to connected participants without requiring a page refresh.
- Conversations are organized into separate communication rooms.
- Users receive relevant notifications and updates.

The system combines request management and real-time messaging to streamline communication between customers and administrators.

### 📅 Appointments & Follow-Ups

- Manage customer appointments and meetings.
- Coordinate meetings between customers and managers.
- Maintain meeting reports and follow-up tasks.
- Support customer reminders and related notifications.

## 🏗️ Architecture

### Monorepo Architecture

Berelian Club uses a **Monorepo architecture** to manage multiple applications and shared packages within a single repository.

```text
monorepo-bashgah-moshtarian/
├── apps/
│   ├── client/              # Next.js customer application
│   ├── admin/               # Next.js admin dashboard
│   └── server/              # Express.js backend API
│
├── packages/
│   ├── ui/                  # Shared UI components
│   ├── schema/              # Shared schemas and validation
│   ├── eslint-config/       # Shared ESLint configuration
│   └── typescript-config/   # Shared TypeScript configuration
│
├── package.json
└── turbo.json
```

The monorepo structure helps keep applications and shared code organized while simplifying dependency management and code reuse.

### Feature-Based Frontend Architecture

The client and admin applications follow a **Feature-Based Architecture**, organizing code around application features and business domains.

This structure helps to:

- Keep related components, hooks, and services together.
- Improve code readability and maintainability.
- Reduce unnecessary coupling between features.
- Make individual features easier to extend and maintain.
- Support a clearer separation of responsibilities.

### Dependency Injection in the Backend

The backend uses **Dependency Injection (DI)** to manage service dependencies and separate business logic from infrastructure concerns.

The backend is organized around modular responsibilities, including:

- **Routes:** Define API endpoints.
- **Controllers:** Handle HTTP requests and responses.
- **Services:** Encapsulate business logic.
- **Models:** Define MongoDB data structures through Mongoose.
- **Middleware:** Handle authentication, validation, and other cross-cutting concerns.
- **Dependency Container:** Manage and provide service dependencies.

This design improves separation of concerns, testability, and maintainability as the application evolves.

### Shared Packages

Common functionality is extracted into dedicated workspace packages to reduce duplication and maintain consistency across applications.

- **UI Package:** Reusable components shared between the client and admin applications.
- **Schema Package:** Shared schemas and validation definitions.
- **TypeScript Configuration:** Consistent compiler settings across workspaces.
- **ESLint Configuration:** Shared code quality and linting rules.

### Monorepo Tooling

The project uses **Turborepo and npm Workspaces** to manage applications, shared packages, dependencies, and development workflows.

## 🛠️ Tech Stack

### Frontend

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide](https://lucide.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://zustand.docs.pmnd.rs/)

### Backend

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- TypeScript
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Socket.IO](https://socket.io/)
- OTP-based authentication
- Cookie-based session authentication

### Infrastructure & Tooling

- [Turborepo](https://turbo.build/repo)
- npm Workspaces
- [Render](https://render.com/)
- Git & GitHub

## 🔒 Security Considerations

The application uses controlled account creation and authenticated access to protect customer-related functionality.

Security considerations include:

- OTP-based authentication.
- HTTP-only cookies for sensitive authentication tokens, where configured.
- Protected API endpoints and access control.
- CORS configuration for deployed applications.
- Validation and centralized error handling.
- Authorization checks for conversations and customer resources.

Sensitive customer information, uploaded documents, and conversations should only be accessible to authorized users.

Production deployments should also include appropriate rate limiting, secure environment configuration, database backups, HTTPS, and monitoring.

## 🚀 Getting Started

### Prerequisites

Make sure the following tools are installed:

- [Node.js](https://nodejs.org/)
- npm
- [MongoDB](https://www.mongodb.com/)

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd monorepo-bashgah-moshtarian
```

### 2. Install Dependencies

Install dependencies from the repository root:

```bash
npm install
```

### 3. Configure Environment Variables

Configure the environment variables required by the client, admin, and server applications.

Depending on the application configuration, these may include:

- MongoDB connection URI.
- Authentication and token secrets.
- Application port.
- Client and admin application URLs.
- CORS allowed origins.
- SMS provider credentials for OTP delivery.
- Frontend API base URLs.
- Socket.IO connection configuration.

Use the variable names expected by the actual source code and application configuration.

**Never commit real `.env` files, API keys, authentication secrets, OTP credentials, or database credentials to GitHub.**

### 4. Run the Applications

Use the scripts defined in the root and workspace `package.json` files.

For example, if the root development script is configured to run the applications through Turborepo:

```bash
npm run dev
```

Check the repository's scripts for the exact commands supported by the current configuration.

## 📦 Deployment

Berelian Club consists of three main applications:

| Application | Technology | Responsibility |
|---|---|---|
| Client | Next.js | Customer-facing application |
| Admin | Next.js | Administrative dashboard |
| Server | Express.js | API, business logic, authentication, and real-time communication |

The client and admin applications are deployed independently, while the backend provides the API and Socket.IO services.

Deployment requires appropriate environment variables, database connectivity, CORS configuration, HTTPS, and authentication cookie settings.

## 🔮 Future Improvements

Potential areas for further development include:

- Unit and integration testing.
- CI/CD automation.
- Enhanced logging and monitoring.
- Automated database backup and recovery.
- Performance optimization and caching.
- Progressive Web App (PWA) support.
- Background job processing when needed.
- Additional scalability improvements based on actual usage.

## 🎯 Project Goals

Berelian Club demonstrates practical experience with:

- Full-stack web application development.
- Monorepo architecture and workspace management.
- Feature-based frontend architecture.
- Dependency Injection and modular backend design.
- Shared component and schema packages.
- RESTful API development.
- Real-time communication with Socket.IO.
- OTP-based authentication.
- Controlled user registration and account management.
- Customer request and ticket workflows.
- Database modeling and application security.

## 👨‍💻 Author

Developed as a full-stack web development project focused on maintainable architecture, reusable components, real-time communication, and customer relationship management.

---

**Berelian Club — A modular full-stack platform for customer and investment relationship management.**
