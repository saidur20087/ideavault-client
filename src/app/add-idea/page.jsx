'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddIdeaPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const description = form.description.value;
    const targetAudience = form.targetAudience.value;


    const newIdea = {
      title,
      category,
      description,
      targetAudience,
      userEmail: user?.email,
      userName: user?.name,
    };

    try {

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/ideas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIdea),
      });

      const data = await res.json();

      if (data.success) {

        console.log("Idea Created Successfully!");

        form.reset();
        router.push('/ideas');
      }
    } catch (error) {
      console.error("Error creating idea:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-white dark:bg-[#131926]/40 border rounded-2xl shadow-sm">
      <h2 className="text-3xl font-bold mb-6">Submit Your Startup Idea</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-2">Idea Title</label>
          <input type="text" name="title" required className="w-full p-3 border rounded-xl bg-transparent" placeholder="Enter a catchy title" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Category</label>
          <select name="category" required className="w-full p-3 border rounded-xl bg-white dark:bg-[#0b0f19]">
            <option value="AI & Automation">AI & Automation</option>
            <option value="HealthTech">HealthTech</option>
            <option value="EdTech">EdTech</option>
            <option value="FinTech">FinTech</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Description</label>
          <textarea name="description" rows="4" required className="w-full p-3 border rounded-xl bg-transparent" placeholder="Describe your concept..."></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Target Audience</label>
          <input type="text" name="targetAudience" required className="w-full p-3 border rounded-xl bg-transparent" placeholder="e.g. Students, Small Businesses" />
        </div>

        <button type="submit" disabled={loading} className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition">
          {loading ? 'Saving Idea...' : 'Submit Idea'}
        </button>
      </form>
    </div>
  );
};

export default AddIdeaPage;