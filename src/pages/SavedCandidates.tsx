import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('candidateSearch');
    if (stored) {
      setSavedCandidates(JSON.parse(stored));
    }
  }, []);

  const handleRemove = (login: string) => {
    const updated = savedCandidates.filter((candidate) => candidate.login !== login);
    setSavedCandidates(updated);
    localStorage.setItem('candidateSearch', JSON.stringify(updated));
  };

  return (
    <section>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No more candidates to review.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Profile</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.login}>
                <td style={{ textAlign: 'center' }}>
                  <img
                    src={candidate.avatar_url}
                    alt={`${candidate.login}'s avatar`}
                    style={{ width: '50px', borderRadius: '50%' }}
                  />
                </td>
                <td>{candidate.name}</td>
                <td>{candidate.login}</td>
                <td>{candidate.location}</td>
                <td>{candidate.email}</td>
                <td>{candidate.company}</td>
                <td>
                  <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <button className="button remove-btn" onClick={() => handleRemove(candidate.login)}>
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};


export default SavedCandidates;
