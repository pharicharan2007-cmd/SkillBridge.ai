-- Seed: assessment_data.sql
-- Description: Insert seed data for target roles and assessment questions

-- 1. Seed Target Roles
INSERT INTO public.target_roles (id, role_name, required_skills) VALUES
(gen_random_uuid(), 'Frontend Developer', '{"JavaScript": 80, "React": 80, "CSS": 70, "Communication": 70}'),
(gen_random_uuid(), 'Backend Developer', '{"Node.js": 80, "SQL": 80, "System Design": 70, "Problem Solving": 80}'),
(gen_random_uuid(), 'Full Stack Developer', '{"JavaScript": 80, "React": 70, "Node.js": 70, "SQL": 70, "Communication": 80}')
ON CONFLICT (role_name) DO NOTHING;

-- 2. Seed Assessment Questions (Software Engineering)

-- Baseline (8 questions)
INSERT INTO public.assessment_questions (discipline, phase, text, options, correct_answer, points, metadata) VALUES
('Software Engineering', 'baseline', 'What does HTML stand for?', '["Hyper Text Markup Language", "High Text Markup Language", "Hyper Tabular Markup Language", "None of these"]', 'Hyper Text Markup Language', 1, '{"skill": "Web Fundamentals"}'),
('Software Engineering', 'baseline', 'Which data structure uses LIFO?', '["Queue", "Stack", "Tree", "Graph"]', 'Stack', 1, '{"skill": "Data Structures"}'),
('Software Engineering', 'baseline', 'What is the time complexity of binary search?', '["O(n)", "O(n^2)", "O(log n)", "O(1)"]', 'O(log n)', 1, '{"skill": "Algorithms"}'),
('Software Engineering', 'baseline', 'Which protocol is used for secure communication over the internet?', '["HTTP", "FTP", "HTTPS", "SMTP"]', 'HTTPS', 1, '{"skill": "Networking"}'),
('Software Engineering', 'baseline', 'What does SQL stand for?', '["Structured Question Language", "Structured Query Language", "Strong Question Language", "Standard Query Language"]', 'Structured Query Language', 1, '{"skill": "Databases"}'),
('Software Engineering', 'baseline', 'Which of the following is not a primitive data type in Java?', '["int", "float", "String", "boolean"]', 'String', 1, '{"skill": "Programming Fundamentals"}'),
('Software Engineering', 'baseline', 'What is a primary key in a database?', '["A key used to open the database", "A unique identifier for a record", "A key that links two tables", "A foreign key"]', 'A unique identifier for a record', 1, '{"skill": "Databases"}'),
('Software Engineering', 'baseline', 'What does CSS stand for?', '["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"]', 'Cascading Style Sheets', 1, '{"skill": "Web Fundamentals"}');

-- Role-Specific (8 questions)
INSERT INTO public.assessment_questions (discipline, phase, text, options, correct_answer, points, metadata) VALUES
('Software Engineering', 'role_specific', 'In React, what hook is used to manage side effects?', '["useState", "useEffect", "useContext", "useReducer"]', 'useEffect', 2, '{"skill": "React", "role": "Frontend Developer"}'),
('Software Engineering', 'role_specific', 'What is the virtual DOM in React?', '["A direct copy of the real DOM", "A lightweight JavaScript representation of the DOM", "A browser feature", "A database structure"]', 'A lightweight JavaScript representation of the DOM', 2, '{"skill": "React", "role": "Frontend Developer"}'),
('Software Engineering', 'role_specific', 'In Node.js, which module is used to create a web server?', '["fs", "http", "path", "url"]', 'http', 2, '{"skill": "Node.js", "role": "Backend Developer"}'),
('Software Engineering', 'role_specific', 'What is an index in a database?', '["A table of contents to speed up retrieval", "A constraint to ensure uniqueness", "A type of join", "A backup of the table"]', 'A table of contents to speed up retrieval', 2, '{"skill": "SQL", "role": "Backend Developer"}'),
('Software Engineering', 'role_specific', 'What does ACID stand for in database transactions?', '["Atomicity, Consistency, Isolation, Durability", "Accuracy, Completeness, Isolation, Durability", "Atomicity, Consistency, Integrity, Durability", "None of the above"]', 'Atomicity, Consistency, Isolation, Durability', 2, '{"skill": "SQL", "role": "Backend Developer"}'),
('Software Engineering', 'role_specific', 'Which of the following is a CSS preprocessor?', '["HTML", "Sass", "JavaScript", "React"]', 'Sass', 2, '{"skill": "CSS", "role": "Frontend Developer"}'),
('Software Engineering', 'role_specific', 'What is event delegation in JavaScript?', '["Attaching an event listener to multiple elements", "Attaching a single event listener to a parent element to handle events on its children", "Preventing default event behavior", "None of the above"]', 'Attaching a single event listener to a parent element to handle events on its children', 2, '{"skill": "JavaScript", "role": "Frontend Developer"}'),
('Software Engineering', 'role_specific', 'What is middleware in Express.js?', '["A function that has access to request and response objects", "A database wrapper", "A frontend component", "A styling tool"]', 'A function that has access to request and response objects', 2, '{"skill": "Node.js", "role": "Backend Developer"}');

-- Soft Skills (8 questions)
INSERT INTO public.assessment_questions (discipline, phase, text, options, correct_answer, points, metadata) VALUES
('Software Engineering', 'soft_skills', 'How do you handle a disagreement with a team member over technical choices?', '["Ignore them and do it my way", "Argue until they agree", "Discuss pros and cons objectively and seek consensus", "Ask the manager to decide immediately without discussion"]', 'Discuss pros and cons objectively and seek consensus', 1, '{"skill": "Communication"}'),
('Software Engineering', 'soft_skills', 'What is the most important aspect of code reviews?', '["Finding bugs", "Enforcing formatting rules", "Sharing knowledge and improving code quality", "Proving who is the better programmer"]', 'Sharing knowledge and improving code quality', 1, '{"skill": "Collaboration"}'),
('Software Engineering', 'soft_skills', 'If you realize you will miss a deadline, what should you do?', '["Work overnight without telling anyone", "Communicate the delay early and propose a revised plan", "Blame other team members", "Deliver incomplete work on time"]', 'Communicate the delay early and propose a revised plan', 1, '{"skill": "Time Management"}'),
('Software Engineering', 'soft_skills', 'How do you prioritize tasks when multiple urgent requests come in?', '["Do the easiest first", "Do the hardest first", "Assess impact and urgency, and consult stakeholders if needed", "Do them randomly"]', 'Assess impact and urgency, and consult stakeholders if needed', 1, '{"skill": "Problem Solving"}'),
('Software Engineering', 'soft_skills', 'Why is documentation important in a project?', '["It looks good to management", "It helps other developers understand and maintain the code", "It is required by law", "It slows down development"]', 'It helps other developers understand and maintain the code', 1, '{"skill": "Communication"}'),
('Software Engineering', 'soft_skills', 'How do you approach learning a new technology required for a project?', '["Refuse to use it", "Read documentation, build prototypes, and ask for help if stuck", "Wait for someone to teach me", "Copy-paste from tutorials without understanding"]', 'Read documentation, build prototypes, and ask for help if stuck', 1, '{"skill": "Adaptability"}'),
('Software Engineering', 'soft_skills', 'What does taking ownership of a task mean to you?', '["Doing it only if asked multiple times", "Taking responsibility from start to finish, including addressing issues", "Delegating it to someone else", "Doing the bare minimum"]', 'Taking responsibility from start to finish, including addressing issues', 1, '{"skill": "Responsibility"}'),
('Software Engineering', 'soft_skills', 'How do you respond to constructive feedback?', '["Get defensive", "Ignore it", "Listen, reflect, and apply it to improve", "Argue back"]', 'Listen, reflect, and apply it to improve', 1, '{"skill": "Growth Mindset"}');
