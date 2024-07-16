// components/SocialSection.tsx
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import '../styles/socialsection.scss';

interface SocialSectionProps {
  comments: number;
  likes: number;
}

const SocialSection: React.FC<SocialSectionProps> = ({ comments, likes }) => {
  const [commentText, setCommentText] = useState('');

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = () => {
    // Handle comment submission
    console.log(commentText);
    setCommentText('');
  };

  return (
    <div className="social-section bd">
      <div className="social-likes"><Heart className="icon" /> {likes}</div>
      <div className="comment-section">
        <h3>Comments</h3>
        {comments}
        <textarea
          placeholder="Add a comment..."
          value={commentText}
          onChange={handleCommentChange}
        />
        <button onClick={handleCommentSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default SocialSection;
