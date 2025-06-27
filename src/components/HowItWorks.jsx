import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      icon: (
        <img src="https://demoapus2.com/freelanhub/wp-content/uploads/2024/07/featured1.svg" />
      ),
      title: "Post Your Job.",
      description:
        "Create a job listing with details like requirements and budget.",
    },
    {
      icon: <img src="https://demoapus2.com/freelanhub/wp-content/uploads/2024/07/featured2.svg" />,
      title: "Review Applicants",
      description: "Receive and evaluate applications from freelancers.",
    },
    {
      icon: <img src="https://demoapus2.com/freelanhub/wp-content/uploads/2024/07/featured3.svg" />,
      title: "Choose a Freelancer",
      description:
        "Conduct interviews or discussions to choose the best candidate.",
    },
    {
      icon: <img src="https://demoapus2.com/freelanhub/wp-content/uploads/2024/07/featured4.svg" />,
      title: "Manage the Project",
      description:
        "Collaborate with the selected freelancer to complete the project.",
    },
  ];

  return (
    <div className="bg-gray-50 py-20 px-4">
      <div className="max-w-[1500px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works For Employers
          </h2>
          <p className="text-gray-600 text-lg">
            Recruitment made easy in 100 seconds
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="p-6">
                <div className="relative mb-4">
                  <div className="text-gray-700">{step.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
