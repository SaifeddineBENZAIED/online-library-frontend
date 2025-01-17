# Online Library - Frontend (Angular)

This repository contains the **frontend** of an **Online Library with Payment Integration**, built using **Angular**. The frontend provides a **modern and interactive user interface** for users to browse books, read online, and purchase digital content. It communicates with the backend (built with NestJS) via **RESTful APIs** to fetch and manage data.

---

## 🚀 Features

- **Book Browsing**: Users can browse books by category, author, or title.
- **Online Reading**: Allows users to read books directly in the browser.
- **Payment Integration**: Secure payment processing for purchasing digital content.
- **User Authentication**: Login and registration with JWT (JSON Web Tokens).
- **Responsive Design**: Compatible with mobile and desktop devices.

---

## 🛠️ Technologies Used

- **Frontend Framework**: Angular
- **UI Library**: Angular Material
- **State Management**: RxJS (Observables)
- **API Communication**: RESTful APIs (NestJS backend)
- **Payment Integration**: Stripe or PayPal (depending on backend implementation)

---

## 📂 Repository Structure
online-library-frontend/
├── src/
│ ├── app/
│ │ ├── components/ # Angular components (book list, book details, etc.)
│ │ ├── services/ # Services for API communication
│ │ ├── models/ # Data models (interfaces)
│ │ ├── guards/ # Route guards for authentication
│ │ ├── interceptors/ # HTTP interceptors (optional)
│ │ └── app.module.ts # Main application module
│ ├── assets/ # Static assets (images, styles)
│ ├── environments/ # Environment configurations (dev, prod)
│ └── styles.scss # Global styles
├── angular.json # Angular CLI configuration
├── package.json # Project dependencies
├── README.md # Project documentation
└── .gitignore # Git ignore file

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Angular CLI (v16+)

### Steps to Run the Frontend

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/SaifeddineBENZAIED/online-library-frontend.git
   cd online-library-frontend
   
2. **Install Dependencies**:

```bash
npm install
```

3. **Start the Application**:

```bash
ng serve
```
The app will be available at http://localhost:4200.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

🔍 Key Features

User Interface

- Book List: Displays a list of books with filters and search functionality.

- Book Details: Shows detailed information about a selected book.

- Online Reader: Allows users to read books directly in the browser.

Authentication

- Login/Register: Users can create an account or log in to access premium features.

- JWT Integration: Secure authentication using JSON Web Tokens.

Responsive Design

- Mobile-Friendly: The interface adapts to different screen sizes.

- User Experience: Designed to be intuitive and easy to use.

📫 Contact
For questions or feedback, feel free to reach out:

- Email: saif2001benz2036@gmail.com
