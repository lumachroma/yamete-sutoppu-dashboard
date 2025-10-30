# Type Definitions

This directory contains all TypeScript type definitions for the yamete-sutoppu-dashboard application, organized by domain for maintainability and extensibility.

## Directory Structure

```
src/types/
├── index.ts          # Main exports - import types from here
├── user.ts           # User entity and related types
├── auth.ts           # Authentication related types
├── api.ts            # API response and request types
├── common.ts         # Common form and UI types
├── hooks.ts          # React hooks and component types
├── utils.ts          # Utility types and base entities
└── constants.ts      # Type-safe constants and enums
```

## Usage

### Import types from the main index:
```typescript
import { User, LoginFormData, ApiResponse } from '@/types';
```

### Import specific domain types:
```typescript
import { User, UserFormData } from '@/types/user';
import { LoginFormData, OTPVerificationRequest } from '@/types/auth';
```

## Type Organization Philosophy

### 1. **Domain-Based Organization**
Types are grouped by their business domain (user, auth, api, etc.) rather than by technical concerns.

### 2. **Extensibility**
- Base interfaces can be extended for specific use cases
- Utility types provide common patterns for CRUD operations
- Constants are type-safe and centralized

### 3. **Reusability**
- Common patterns like `BaseEntity`, `CreateData<T>`, and `UpdateData<T>` reduce duplication
- Generic types like `ApiResponse<T>` and `PaginatedResponse<T>` work with any data type

### 4. **Type Safety**
- Constants are defined using `as const` for literal types
- Enums are avoided in favor of const objects for better tree-shaking
- Proper constraints on generic types

## Examples

### Creating a new entity type:
```typescript
// In types/product.ts
import { BaseEntity } from './utils';

export interface Product extends BaseEntity {
  name: string;
  price: number;
  category: string;
}

export type ProductFormData = CreateData<Product>;
```

### Using API types:
```typescript
// In a component or service
import { ApiResponse, Product } from '@/types';

const response: ApiResponse<Product[]> = await fetch('/api/products');
```

### Extending form types:
```typescript
// For a specific form with additional validation
interface ProductFormData extends CreateData<Product> {
  confirmPrice?: number; // Additional form-only field
}
```

## Best Practices

1. **Always import from `@/types`** for consistency
2. **Extend base interfaces** rather than duplicating properties
3. **Use utility types** for common patterns (CreateData, UpdateData)
4. **Keep domain types focused** - avoid mixing concerns
5. **Document complex types** with JSDoc comments
6. **Use generic constraints** to ensure type safety

## Adding New Types

When adding new types:

1. Create a new file in the appropriate domain (e.g., `product.ts`)
2. Define interfaces following existing patterns
3. Export from the main `index.ts` file
4. Update this README if adding a new domain