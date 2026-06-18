/**
 * CONTRIBUTING.md
 * Guidelines for contributing to the project
 */

# Contributing to Sweet Shop

Thank you for your interest in contributing! Here are guidelines to follow:

## Code Style

- Use **2 spaces** for indentation
- Use **single quotes** for strings
- Add **semicolons** at end of statements
- Use **camelCase** for variables and functions
- Use **PascalCase** for classes and components

## File Structure

### Backend
```
src/api/v1/
├── controllers/      # Request handlers
├── services/         # Business logic
├── validators/       # Input validation
├── routes/          # Route definitions
```

### Frontend
```
src/
├── components/      # React components
├── pages/          # Page components
├── hooks/          # Custom hooks
├── services/       # API services
├── store/          # State management
```

## Commit Messages

Use conventional commits:
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Code style changes
refactor: Refactor code
test: Add tests
```

## Pull Requests

1. Create a feature branch: `git checkout -b feature/name`
2. Make changes following the code style
3. Commit with conventional messages
4. Push: `git push origin feature/name`
5. Create PR with description

## Testing

- Write tests for new features
- Run tests before committing: `npm test`
- Maintain minimum 80% code coverage

## Issues

- Check existing issues first
- Provide clear description
- Include steps to reproduce
- Add relevant labels

## Questions?

Open an issue for discussions or email the team.

---

Thanks for contributing! 🎉
