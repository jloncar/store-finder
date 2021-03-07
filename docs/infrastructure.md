# Pipeline

- CI/CD via AWS CodePipeline
- Code is pushed to Github
- AWS CodeBuild detects change, starts build
- Buildspec in repo root contains build steps for both backend and frontend
- As a result, artifact files are generated
-
