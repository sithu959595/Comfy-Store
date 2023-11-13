const SectionTitle = ({ text }) => {
  return (
    <div className="border-b border-base-300 pb-5">
      <div className="text-3xl font-medium tracking-wider capitalize">
        {text}
      </div>
    </div>
  );
};

export default SectionTitle;
