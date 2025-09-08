
import React from 'react';

const BlogCard: React.FC<{ title: string; excerpt: string; date: string; }> = ({ title, excerpt, date }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-200">
        <h4 className="font-bold text-lg text-slate-800">{title}</h4>
        <p className="text-sm text-slate-500 mt-1 mb-3">{date}</p>
        <p className="text-slate-600">{excerpt}</p>
        <a href="#" className="text-indigo-600 hover:text-indigo-800 font-semibold mt-4 inline-block">Read More &rarr;</a>
    </div>
);

export const BlogSection: React.FC = () => {
  return (
    <section id="blog" className="mt-20 py-10 border-t border-slate-200">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900">
          Latest News & Updates
        </h2>
        <p className="mt-2 text-lg text-slate-600">
          Stay informed about exam announcements and educational news.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BlogCard 
            title="How AI is Changing Exam Predictions"
            excerpt="Discover the technology behind our predictions and how machine learning models analyze trends to provide accurate forecasts."
            date="October 26, 2024"
        />
        <BlogCard 
            title="Top 5 Tips for Checking Your Results Online"
            excerpt="Your result day can be stressful. Follow these tips to ensure a smooth experience when checking your scores online."
            date="October 22, 2024"
        />
        <BlogCard 
            title="Understanding Your Scorecard: A Detailed Guide"
            excerpt="From grades to percentile scores, we break down what each part of your result scorecard means."
            date="October 18, 2024"
        />
      </div>
    </section>
  );
};
