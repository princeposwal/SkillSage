const resume =`
Alex Mercer

San Francisco, CA | alex.mercer@email.com | linkedin.com/in/alex-mercer-demo

Professional Summary

Performance-driven Software Engineer with 3+ years of experience designing and implementing high-throughput backend systems. Adept at optimizing database performance, refining CI/CD pipelines, and collaborating with cross-functional teams to deliver robust software solutions.

Technical Skills

Languages: C++, Java, Python, SQL, Go

Frameworks & Tools: Spring Boot, Docker, Kubernetes, Git, gRPC

Databases & Cloud: PostgreSQL, Redis, AWS (S3, EC2, RDS), Kafka

Professional Experience

Backend Software Engineer | CloudScale Solutions | June 2024 – Present

Designed and deployed a distributed data ingestion pipeline using Java and Apache Kafka, handling over 10M+ daily events.

Optimized legacy SQL queries and implemented a distributed caching layer using Redis, reducing average API response times by 35%.

Migrated a monolithic payment verification service into localized microservices using Docker and Kubernetes, improving deployment frequency by 40%.

Associate Software Engineer | Apex Tech Systems | July 2023 – June 2024

Maintained and enhanced core backend services written in C++, ensuring high availability and minimal downtime.

Collaborated with the QA team to build automated integration testing suites, cutting regression testing time down by 15 hours per release cycle.

Participated in weekly code reviews and system architecture design sessions for upcoming product features.

Education

B.S. in Computer Science Engineering

Tech State University | Graduated: May 2023 
`
const SelfDescription = `
"Backend Engineer passionate about building scalable microservices and optimizing data pipelines. Experienced in C++, Java, and system design, with a track record of reducing API latency and improving system reliability. I love breaking down complex algorithmic problems and turning them into clean, maintainable code. Always looking to connect with fellow tech enthusiasts and systems engineers."
`

const jobDescription = `
Role: Software Engineer II (Backend)

Company: InnovateX Labs

Location: Remote / Hybrid (SF Office)

Position Overview:

We are looking for a Backend Software Engineer II to join our Core Infrastructure team. In this role, you will be responsible for scaling our backend APIs, optimizing data storage, and ensuring our services remain highly available as our user base grows.

Key Responsibilities:

Design, build, and maintain efficient, reusable, and reliable backend code.

Identify bottlenecks and bugs, and devise solutions to mitigate these problems.

Help maintain code quality, organization, and automatization.

Work closely with frontend engineers and product managers to define API contracts and feature specifications.

Minimum Qualifications:

Bachelor’s degree in Computer Science, Engineering, or a related technical field.

2-4 years of professional software development experience.

Strong proficiency in at least one core language (e.g., Java, C++, Go, or Python).

Solid understanding of relational databases (like PostgreSQL) and key-value stores (like Redis).

Experience with containerization tools (Docker) and cloud infrastructure (AWS or GCP).

Preferred Qualifications:

Experience building event-driven architectures using Kafka or RabbitMQ.

Familiarity with Kubernetes orchestration.
`

module.exports = {
    resume,
    SelfDescription,
    jobDescription
}