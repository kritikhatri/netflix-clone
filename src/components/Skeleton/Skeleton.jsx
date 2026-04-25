import './Skeleton.css';

const Skeleton = ({ isLarge = false }) => (
  <div className={`skeleton ${isLarge ? 'skeleton--large' : ''}`}>
    <div className="skeleton__poster" />
  </div>
);

export default Skeleton;