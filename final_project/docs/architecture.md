# System Architecture

## Architecture Diagram

```mermaid
graph TD
    User[User] -->|Browser| Frontend[Frontend (React/Vite)]
    Frontend -->|HTTP Requests (Axios)| API[Backend API (Express)]
    API -->|Mongoose ODM| DB[(MongoDB Database)]
    
    subgraph Frontend Logic
        Router[React Router]
        Pages[Pages: Home, Add/Edit]
        Components[Components: BookList, Form]
        Service[API Service]
        
        Router --> Pages
        Pages --> Components
        Pages --> Service
    end
    
    subgraph Backend Logic
        Server[Server.js]
        Routes[Routes: /api/books]
        Controller[Controller Logic]
        Model[Mongoose Model: Book]
        
        Server --> Routes
        Routes --> Controller
        Controller --> Model
    end
```

## Data Flow (CRUD)

1. **Create**: User submits form -> Frontend sends POST -> Backend validates & saves to DB.
2. **Read**: Page loads -> Frontend sends GET -> Backend queries DB -> Returns JSON.
3. **Update**: User submits edit -> Frontend sends PUT -> Backend updates document.
4. **Delete**: User clicks delete -> Frontend sends DELETE -> Backend removes document.
