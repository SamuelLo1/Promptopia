import PromptCard from "./PromptCard";

const Saved = ({ name, desc, data,saved  }) => {
  return (
    <div> 
      <section className='w-full'>
        <h1 className='head_text text-left'>
          <span className='blue_gradient'>{name} Saved</span>
        </h1>
        <p className='desc text-left'>{desc}</p>

        <div className='mt-10 prompt_layout'>
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              saved={saved}
            />
          ))}
        </div>
      </section>
    </div>
  )
};

export default Saved;