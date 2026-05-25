import '../style/home.scss'

const Home = () => {
  return (
    <main className="interview-plan">
      <div className="interview-plan-container">
        <div className="header">
          <h1 className="title">
            Create Your Custom <span className="highlight">Interview Plan</span>
          </h1>
          <p className="subtitle">
            Let our AI analyze the job requirements and your unique profile to build a
            winning strategy.
          </p>
        </div>

        <div className="form-section">
          <div className="column left-column">
            <div className="section-header">
              <div className="icon red-icon"></div>
              <h2>Target Job Description</h2>
              <span className="badge">Required</span>
            </div>
            <textarea
              className="textarea"
              placeholder="Paste the full job description here...\n e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design.'"
            ></textarea>
          </div>

          <div className="column right-column">
            <div className="section-header">
              <div className="icon pink-icon"></div>
              <h2>Your Profile</h2>
            </div>

            <div className="profile-section">
              <div className="subsection-header">
                <p className="subsection-title">Upload Resume</p>
                <span className="sub-badge">Best Results</span>
              </div>
              <div className="file-upload-area">
                <div className="upload-icon">
                  <svg viewBox="0 0 64 64" role="img" aria-hidden="true">
                    <path d="M47.4 30.5c0-5.5-4.5-10-10-10-1.2 0-2.3.2-3.3.6-1.5-4.2-5.5-7.1-10.1-7.1-5.9 0-10.7 4.8-10.7 10.7 0 .7.1 1.4.2 2.1C12.7 26.6 8 31.7 8 37.8c0 6.8 5.5 12.3 12.3 12.3h25.1c5 0 9-4 9-9 0-4.3-3-7.9-7.0-8.7z" />
                    <path d="M30.7 40.3l5.5-5.5-5.5-5.5v3.3H22v4.4h8.7v3.3z" fill="#fff" opacity="0.9" />
                  </svg>
                </div>
                <p className="upload-text">Click to upload or drag & drop</p>
                <p className="upload-subtext">PDF or DOCX (Max 3MB)</p>
              </div>
            </div>

            <div className="divider">
              <span className="divider-text">OR</span>
            </div>

            <div className="profile-section">
              <p className="subsection-title">Quick Self-Description</p>
              <textarea
                className="textarea"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              ></textarea>
            </div>

            <div className="checkbox-section">
              <input type="checkbox" id="profile-check" className="checkbox" />
              <label htmlFor="profile-check" className="checkbox-label">
                Either a Resume or a <strong>Self Description</strong> is required to generate a
                personalized plan.
              </label>
            </div>
          </div>
        </div>

        <div className="form-footer-row">
          <p className="info-text">AI-Powered Strategy Generation • Approx 30s</p>
          <button className="generate-button">✨ Generate My Interview Strategy</button>
        </div>

        <footer className="footer">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#help">Help Center</a>
        </footer>
      </div>
    </main>
  )
}

export default Home
