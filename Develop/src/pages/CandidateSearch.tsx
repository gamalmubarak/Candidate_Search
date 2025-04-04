import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidateList, setCandidateList] = useState<{ login: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const users = await searchGithub();
        setCandidateList(users);
      } catch (err) {
        setError('Failed to fetch candidates. Please try again later.');
      }
    };
    fetchCandidates();
  }, []);

  useEffect(() => {
    const loadCandidate = async () => {
      if (candidateList.length > 0 && currentIndex < candidateList.length) {
        const username = candidateList[currentIndex].login;
        const rawUser = await searchGithubUser(username);
        setCandidate(transformGithubUserToCandidate(rawUser));
      } else {
        setCandidate(null);
      }
    };
    loadCandidate();
  }
  );
  // Interface for the GitHub user object
  // This interface should match the structure of the data returned by the GitHub API
  // when searching for users
  
  interface GithubUser {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    name?: string;
    location?: string;
    email?: string;
    company?: string;
    bio?: string;
  }

  const transformGithubUserToCandidate = (rawUser: GithubUser): Candidate => ({
    id: rawUser.id,
    login: rawUser.login,
    avatar_url: rawUser.avatar_url,
    html_url: rawUser.html_url,
    name: rawUser.name || 'Not available',
    location: rawUser.location || 'Not available',
    email: rawUser.email || 'Not available',
    company: rawUser.company || 'Not available',
    bio: rawUser.bio || 'Not available',
  });

  const handleSave = () => {
    const savedList = JSON.parse(localStorage.getItem('candidateSearch') || '[]');
    if (candidate) {
      localStorage.setItem('candidateSearch', JSON.stringify([...savedList, candidate]));
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleSkip = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h1>Candidate Search</h1>
      {candidate ? (
        <div style={{ textAlign: 'center' }}>
          <img
            src={candidate.avatar_url}
            alt={`${candidate.login}'s avatar`}
            style={{ display: 'block', margin: '0 auto', borderRadius: '50%' }}
          />
          <h2>{candidate.name}</h2>
          <p>Username: {candidate.login}</p>
          <p>Location: {candidate.location}</p>
          <p>Email: {candidate.email}</p>
          <p>Company: {candidate.company}</p>
          <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
            View GitHub Profile
          </a>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <button className="button save-btn" onClick={handleSave}>
              +
            </button>
            <button className="button skip-btn" onClick={handleSkip}>
              -
            </button>
          </div>
        </div>
      ) : (
        <p>No more candidates!</p>
      )}
    </section>
  );
};

export default CandidateSearch;
