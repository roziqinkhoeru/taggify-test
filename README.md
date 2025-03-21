# Tag Manager Component

## Overview

The **Tag Manager** is a reusable component designed to manage tags for various entities (e.g., person, article, book, blog). It allows users to create tags, assign them to entities, and remove tags from entities. The component is built using **Next.js** (App Router) and **TypeScript**, and it interacts with a fake API for data management.

---

## Features

1. **Create Tags**:
   - Create new tags with a unique name and a randomly generated hex color.
2. **Assign Tags to Entities**:
   - Assign tags to specific entities (e.g., an article or a book).
3. **Remove Tags from Entities**:
   - Remove tags from entities when they are no longer needed.
4. **Fetch Tags**:
   - Fetch tags assigned to a specific entity.
   - Fetch tag suggestions for quick selection.

---

## Integration Guide

### 1. **Install Dependencies**

Ensure you have the required dependencies installed in your project:

```bash
npm install
```

---

### 2. **Set Up Environment Variables**

Create a `.env.local` file in the root of your project and add the following environment variable:

```env
NEXT_PUBLIC_API_BASE_URL=https://apitaggify.free.beeceptor.com
```

This will be used as the base URL for all API requests.

---

### 3. **Using the TagManager Component**

The `TagManager` component consists of two main parts:

- **Form Tag**: Located at `components/form-tag.tsx`.
- **Tag Badge**: Located at `components/badge.tsx`.

---

### Updated Documentation for `Component Props`, `API Configuration`, and `Example API Responses`

---

#### **4. Component Props**

##### **`FormTag` Component Props**

The `FormTag` component accepts the following props:

| Prop Name | Type                           | Description                                                              |
| --------- | ------------------------------ | ------------------------------------------------------------------------ |
| `tags`    | `TagRequest[]`                 | The list of tags to display. Each tag has `name` and `color` properties. |
| `setTags` | `(tags: TagRequest[]) => void` | A function to update the list of tags.                                   |

##### **`Badge` Component Props**

The `Badge` component accepts the following props:

| Prop Name   | Type                    | Description                                                          |
| ----------- | ----------------------- | -------------------------------------------------------------------- |
| `color`     | `string`                | The background color of the badge (in hex format).                   |
| `name`      | `string`                | The name of the tag to display.                                      |
| `textColor` | `string` (optional)     | The text color of the badge (default: `text-white`).                 |
| `removable` | `boolean` (optional)    | Whether the badge should display a remove button (default: `false`). |
| `onRemove`  | `() => void` (optional) | A callback function triggered when the remove button is clicked.     |

---

#### **5. API Configuration**

The application interacts with a backend API for managing tags and entities. Below are the API endpoints and their configurations:

##### **Base URL**

The base URL for the API is configured in the `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=https://apitaggify.free.beeceptor.com
```

##### **API Endpoints**

| Endpoint                            | Method | Description                                                  |
| ----------------------------------- | ------ | ------------------------------------------------------------ |
| `/api/tags`                         | GET    | Fetch tags based on search and entity type filters.          |
| `/api/tags`                         | POST   | Create a new tag with a name and color.                      |
| `/api/tags/{entityType}/{entityId}` | GET    | Fetch tags assigned to a specific entity.                    |
| `/api/tags/assign`                  | POST   | Assign tags to an entity.                                    |
| `/api/notes`                        | GET    | Fetch all notes.                                             |
| `/api/blogs`                        | GET    | Fetch all blogs.                                             |
| `/api/articles`                     | GET    | Fetch all articles.                                          |
| `/api/{entityType}/{id}`            | GET    | Fetch details of a specific entity (note, blog, or article). |
| `/api/{entityType}`                 | POST   | Create a new entity (note, blog, or article).                |
| `/api/{entityType}/{id}`            | PUT    | Update an existing entity (note, blog, or article).          |

---

#### **6. Example API Responses**

##### **Fetch Tags**

- **Request**:

  ```bash
  GET /api/tags?search=tech&entityType=article
  ```

- **Response**:

  ```json
  {
  	"data": [
  		{
  			"id": 1,
  			"name": "Technology",
  			"color": "#FF5733",
  			"createdAt": "2023-10-01T12:00:00Z"
  		},
  		{
  			"id": 2,
  			"name": "Tech News",
  			"color": "#33FF57",
  			"createdAt": "2023-10-02T12:00:00Z"
  		}
  	]
  }
  ```

##### **Create Tag**

- **Request**:

  ```bash
  POST /api/tags
  ```

- **Body**:

  ```json
  {
  	"name": "New Tag",
  	"color": "#F1C40F"
  }
  ```

- **Response**:

  ```json
  {
  	"id": 3,
  	"name": "New Tag",
  	"color": "#F1C40F",
  	"createdAt": "2023-10-03T12:00:00Z"
  }
  ```

##### **Fetch Tags by Entity**

- **Request**:

  ```bash
  GET /api/tags/article/123
  ```

- **Response**:

  ```json
  {
  	"data": [
  		{
  			"id": 1,
  			"name": "Technology",
  			"color": "#FF5733",
  			"createdAt": "2023-10-01T12:00:00Z"
  		}
  	]
  }
  ```

##### **Assign Tags to Entity**

- **Request**:

  ```bash
  POST /api/tags/assign
  ```

- **Body**:

  ```json
  {
  	"entityType": "article",
  	"entityId": 123,
  	"tags": [{ "id": 1, "name": "Technology", "color": "#FF5733" }]
  }
  ```

- **Response**:

  ```json
  {
  	"message": "Tags assigned successfully"
  }
  ```

##### **Fetch Notes**

- **Request**:

  ```bash
  GET /api/notes
  ```

- **Response**:

  ```json
  {
  	"data": [
  		{
  			"id": 1,
  			"title": "My First Note",
  			"entityType": "note",
  			"text": "This is a sample note.",
  			"tags": [
  				{
  					"id": 1,
  					"name": "Important",
  					"color": "#FF5733",
  					"createdAt": "2023-10-01T12:00:00Z"
  				}
  			]
  		}
  	]
  }
  ```

##### **Fetch Blogs**

- **Request**:

  ```bash
  GET /api/blogs
  ```

- **Response**:

  ```json
  {
  	"data": [
  		{
  			"id": 1,
  			"title": "My First Blog",
  			"entityType": "blog",
  			"text": "This is a sample blog.",
  			"tags": [
  				{
  					"id": 1,
  					"name": "Technology",
  					"color": "#33FF57",
  					"createdAt": "2023-10-01T12:00:00Z"
  				}
  			]
  		}
  	]
  }
  ```

##### **Fetch Articles**

- **Request**:

  ```bash
  GET /api/articles
  ```

- **Response**:

  ```json
  {
  	"data": [
  		{
  			"id": 1,
  			"title": "My First Article",
  			"entityType": "article",
  			"text": "This is a sample article.",
  			"tags": [
  				{
  					"id": 1,
  					"name": "Science",
  					"color": "#3357FF",
  					"createdAt": "2023-10-01T12:00:00Z"
  				}
  			]
  		}
  	]
  }
  ```

##### **Fetch Entity Details**

- **Request**:

  ```bash
  GET /api/article/123
  ```

- **Response**:

  ```json
  {
  	"id": 123,
  	"title": "Sample Article",
  	"entityType": "article",
  	"text": "This is a sample article.",
  	"tags": [
  		{
  			"id": 1,
  			"name": "Technology",
  			"color": "#FF5733",
  			"createdAt": "2023-10-01T12:00:00Z"
  		}
  	]
  }
  ```

##### **Create Entity**

- **Request**:

  ```bash
  POST /api/article
  ```

- **Body**:

  ```json
  {
  	"title": "New Article",
  	"entityType": "article",
  	"text": "This is a new article.",
  	"tags": [{ "name": "Tech", "color": "#FF5733" }]
  }
  ```

- **Response**:

  ```json
  {
  	"id": 2,
  	"title": "New Article",
  	"entityType": "article",
  	"text": "This is a new article.",
  	"tags": [
  		{
  			"id": 2,
  			"name": "Tech",
  			"color": "#FF5733",
  			"createdAt": "2023-10-03T12:00:00Z"
  		}
  	]
  }
  ```

##### **Update Entity**

- **Request**:

  ```bash
  PUT /api/article/123
  ```

- **Body**:

  ```json
  {
  	"title": "Updated Article",
  	"entityType": "article",
  	"text": "This is an updated article.",
  	"tags": [{ "id": 1, "name": "Technology", "color": "#FF5733" }]
  }
  ```

- **Response**:

  ```json
  {
  	"id": 123,
  	"title": "Updated Article",
  	"entityType": "article",
  	"text": "This is an updated article.",
  	"tags": [
  		{
  			"id": 1,
  			"name": "Technology",
  			"color": "#FF5733",
  			"createdAt": "2023-10-01T12:00:00Z"
  		}
  	]
  }
  ```

---

This updated documentation provides a clear and concise guide for integrating the `FormTag` and `Badge` components, along with the API configuration and example responses.

### 7. **Folder Structure**

Here’s the updated folder structure of the project:

```
src/
├── app/
│   ├── tags/
│   │   └── page.tsx                // Tags management page
│   ├── entities/
│   │   ├── page.tsx                 // Entities overview page
│   │   └── [type]/
│   │       └── [id]/
│   │           └── page.tsx         // Entity-specific tagging page
├── components/
│   ├── form-tag.tsx                 // Form for creating and assigning tags
│   └── badge.tsx                    // Component for displaying tags as badges
├── constants/                       // Constants (e.g., API endpoints)
├── hooks/                           // Custom React hooks
├── libs/                            // Utility functions
├── providers/                       // Context providers
├── services/                        // API service for handling requests
└── types/                           // TypeScript types and interfaces
```

---

### 8. **Running the Project**

1. Clone the repository:

   ```bash
   git clone https://github.com/roziqinkhoeru/taggify-test.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   - Tags Management: `http://localhost:3000/tags`
   - Entity Tagging: `http://localhost:3000/entities/articles/123`

---

### 9. **Testing**

To test the functionality:

1. Open the pages where the `FormTag` and `Badge` components are used.
2. Verify that:
   - Tags can be created and assigned to entities.
   - Tags can be removed from entities.
   - Tag suggestions are displayed correctly.

---

### 10. **Support**

For any issues or questions, please contact:

- **Email**: <roziqinkhoeru@gamil.com>
- **GitHub Issues**: [Create an Issue](https://github.com/roziqinkhoeru/taggify-test/issues)
