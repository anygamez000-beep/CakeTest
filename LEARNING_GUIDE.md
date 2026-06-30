#!/usr/bin/env python3
"""
Learning Git, Databases, Teamwork & Best Practices
This file demonstrates best coding practices
"""

# ============================================================================
# 1. GIT COMMANDS & VERSION CONTROL
# ============================================================================

"""
GIT BASICS - What is Git?
========================
Git is a tool that tracks changes to your code. It's like a "save history"
for your project.

WHY USE GIT?
- Track who changed what and when
- Revert to previous versions if something breaks
- Work with others on the same project
- Backup your code online

BASIC GIT COMMANDS:
-------------------

1. Initialize a repository (first time only):
   $ git init

2. Check status of your changes:
   $ git status

3. Add files to staging area:
   $ git add .                    # Add all files
   $ git add filename.js          # Add specific file

4. Create a commit (save point):
   $ git commit -m "Description of changes"
   Example: $ git commit -m "Add snake game logic"

5. View commit history:
   $ git log

6. Push code to GitHub (upload):
   $ git push origin main

7. Pull code from GitHub (download):
   $ git pull origin main

8. Create a new branch (separate workspace):
   $ git checkout -b feature/new-feature

9. Switch between branches:
   $ git checkout main
   $ git checkout feature/new-feature

10. Merge branches (combine code):
    $ git checkout main
    $ git merge feature/new-feature

GOOD COMMIT MESSAGES:
---------------------
❌ Bad:   "fixed stuff"
✅ Good:  "Fix: Add error handling to joke API fetch"

❌ Bad:   "update"
✅ Good:  "Feature: Add pause button to snake game"

❌ Bad:   "asdf"
✅ Good:  "Docs: Update README with installation instructions"

COMMIT MESSAGE TYPES:
- Feature: New functionality
- Fix: Bug fix
- Docs: Documentation
- Style: Code formatting
- Refactor: Code reorganization
- Test: Adding tests
"""

# ============================================================================
# 2. DATABASES - STORING DATA
# ============================================================================

"""
WHAT IS A DATABASE?
====================
A database is a structured way to store data that you can quickly search,
filter, and update.

TYPES OF DATABASES:
-------------------

1. RELATIONAL DATABASES (SQL)
   - Store data in tables (like Excel spreadsheets)
   - Examples: MySQL, PostgreSQL, SQLite
   - Best for: Structured data, relationships

   Example structure:
   
   USERS TABLE:
   | id | username    | email           |
   |----+-------------+-----------------|
   | 1  | anygamez    | user@email.com  |
   | 2  | player123   | player@email.com|

   SCORES TABLE:
   | id | user_id | game      | score |
   |----|---------|-----------|-------|
   | 1  | 1       | snake     | 150   |
   | 2  | 1       | joke      | 10    |

   SQL COMMANDS:
   - SELECT: Get data
   - INSERT: Add data
   - UPDATE: Modify data
   - DELETE: Remove data

2. NO-SQL DATABASES
   - Store data as documents (JSON-like)
   - Examples: MongoDB, Firebase
   - Best for: Flexible, unstructured data

   Example:
   {
     "user_id": 1,
     "username": "anygamez",
     "scores": [
       {"game": "snake", "score": 150},
       {"game": "joke", "count": 10}
     ]
   }

WHY USE A DATABASE?
-------------------
- Store data permanently (not lost when page refreshes)
- Search large amounts of data quickly
- Multiple users accessing data simultaneously
- Organize related data
"""

# ============================================================================
# 3. TEAMWORK ON GITHUB
# ============================================================================

"""
WORKING WITH A TEAM
====================

PULL REQUESTS (PR)
------------------
A Pull Request is how teams collaborate on code changes.

PULL REQUEST WORKFLOW:
1. Create a branch: git checkout -b feature/awesome-feature
2. Make changes and commit: git commit -m "Add awesome feature"
3. Push to GitHub: git push origin feature/awesome-feature
4. Open Pull Request on GitHub
5. Team reviews your code (feedback)
6. Make changes if needed: git commit -m "Address review feedback"
7. Push updates: git push origin feature/awesome-feature
8. Approve and merge to main

REVIEWING CODE
--------------
When reviewing someone's code, check:
✅ Does it work?
✅ Is it readable?
✅ Are there tests?
✅ Does it follow our style guide?
✅ Are there edge cases?

GOOD REVIEW COMMENTS:
✅ "This function is great, but I think we should add error handling for null values"
❌ "This is wrong"

MERGE CONFLICTS
---------------
When two people edit the same line, Git can't decide which version to keep.

Example conflict:
<<<<<<< HEAD
  const score = 100;
=======
  const score = calculateScore();
>>>>>>> feature/new-scoring

SOLUTION: Manually decide which version to keep, then commit.

GITHUB ISSUES
-------------
Issues are how teams track bugs, features, and tasks.

Example issue:
Title: "Add difficulty levels to snake game"
Description: "Currently only one speed. Add easy/medium/hard modes"
Labels: feature, game
Assigned to: anygamez000-beep

ISSUE WORKFLOW:
1. Create issue
2. Assign to team member
3. Work on it (mention issue in commits)
4. Create PR linked to issue
5. Close issue when PR merges
"""

# ============================================================================
# 4. BEST CODING PRACTICES
# ============================================================================

"""
WRITE GOOD CODE
================

1. NAMING CONVENTIONS
   ❌ Bad:  x = 10, fn(), v
   ✅ Good: playerScore = 10, calculateGameScore(), velocity

2. FUNCTIONS SHOULD DO ONE THING
   ❌ Bad:
   function playGame() {
     // 50 lines of code for input, logic, display, save
   }

   ✅ Good:
   function handleKeyPress() { }
   function updateSnake() { }
   function checkCollisions() { }
   function displayGame() { }

3. DRY - Don't Repeat Yourself
   ❌ Bad:
   alert("Error: Invalid input");
   alert("Error: Network timeout");
   alert("Error: File not found");

   ✅ Good:
   function showError(message) {
     alert(`Error: ${message}`);
   }
   showError("Invalid input");
   showError("Network timeout");

4. COMMENTS
   ✅ Good comment:
   // Calculate snake's new head position based on direction
   const newHead = {
     x: head.x + direction.x,
     y: head.y + direction.y
   };

   ❌ Bad comment:
   // Add 1 to x
   x = x + 1;

5. ERROR HANDLING
   ✅ Good:
   async function fetchJoke() {
     try {
       const response = await fetch(API_URL);
       if (!response.ok) throw new Error("API failed");
       return await response.json();
     } catch (error) {
       console.error("Error fetching joke:", error);
       showUserFriendlyError("Could not load joke. Try again.");
     }
   }

6. CONSISTENT FORMATTING
   Use consistent:
   - Indentation (2 or 4 spaces)
   - Naming style (camelCase, snake_case)
   - Quote style (' or ")
   - Semicolon usage

   Tool: Use Prettier or ESLint

7. TEST YOUR CODE
   ✅ Test different scenarios:
   - Normal case
   - Edge cases (empty, very large)
   - Error cases

8. DOCUMENTATION
   ✅ Good README includes:
   - What the project does
   - How to run it
   - How to contribute
   - License

9. COMMIT OFTEN
   ✅ Good: Commit after each feature
   ❌ Bad: One giant commit with 1000 changes

10. CODE REVIEW
    - Get someone to review your code
    - Give constructive feedback to others
    - Learn from reviews
"""

# ============================================================================
# 5. PRACTICAL EXAMPLE
# ============================================================================

"""
EXAMPLE: Adding a new feature the right way
=============================================

STEP 1: Create an issue on GitHub
---------------------------------
Title: "Add difficulty levels to Snake game"
Description: "Allow users to choose easy/medium/hard modes"

STEP 2: Create a branch
-----------------------
$ git checkout -b feature/difficulty-levels

STEP 3: Make changes with good practices
----------------------------------------
- Use clear variable names
- Write comments for complex logic
- Test thoroughly
- Keep commits small and focused

STEP 4: Commit with clear messages
----------------------------------
$ git commit -m "Feature: Add difficulty selection menu"
$ git commit -m "Feature: Adjust snake speed based on difficulty"
$ git commit -m "Test: Verify all difficulty levels work"

STEP 5: Push to GitHub
----------------------
$ git push origin feature/difficulty-levels

STEP 6: Create Pull Request
----------------------------
Description:
"This PR adds difficulty levels to the snake game.

Changes:
- Add menu for difficulty selection
- Adjust game speed (easy: 150ms, medium: 100ms, hard: 50ms)
- Update README with new feature

Closes #42"

STEP 7: Team reviews code
--------------------------
Review comment: "Good work! Can you add a reset button?"
You add the feature and push: $ git push origin feature/difficulty-levels

STEP 8: Merge and close issue
-----------------------------
PR approved → Merge to main
GitHub automatically closes issue #42

STEP 9: Update main locally
---------------------------
$ git checkout main
$ git pull origin main

DONE! ✅
"""

# ============================================================================
# 6. RESOURCES TO LEARN MORE
# ============================================================================

"""
FREE RESOURCES:
===============
- https://git-scm.com/book/en/v2 - Git official book
- https://github.com/skills/introduction-to-github - GitHub tutorials
- https://www.codecademy.com - Interactive coding lessons
- https://www.freecodecamp.org - YouTube tutorials
- https://stackoverflow.com - Q&A for coding problems

TOOLS:
------
- VS Code - Best code editor (free)
- GitHub Desktop - Visual Git tool (easier than command line)
- Prettier - Auto-format code
- ESLint - Find errors in code
"""

print("✅ You now know the fundamentals of Git, databases, teamwork, and best practices!")
print("🚀 Time to build amazing projects with a professional workflow!")
