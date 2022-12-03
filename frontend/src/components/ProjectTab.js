import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProject,
  updateProject,
  getProjectById,
} from "../features/projects/projectSlice";
import { toast } from "react-toastify";

function ProjectTab({ project, index }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { currentProject, isSuccess } = useSelector((state) => state.project);
  const [tagsArr, setTagsArr] = useState([]);
  const [formData, setFormData] = useState({});
  const projectDelete = () => {
    // console.log(project._id);
    dispatch(deleteProject(project._id));
    toast.error("Delete " + project.title, {
      theme: "dark",
    });
  };

  useEffect(() => {
    if (project.tags) {
      setTagsArr(project.tags.split(","));
    }
  }, [project]);

  useEffect(() => {
    if (currentProject) {
      setFormData({
        _id: currentProject && currentProject._id,
        email: currentProject && currentProject.email,
        title: currentProject && currentProject.title,
        desc: currentProject && currentProject.desc,
        github: currentProject && currentProject.github,
        website: currentProject && currentProject.website,
        tags: currentProject && currentProject.tags,
      });
    }
    // console.log(formData);
  }, [currentProject]);
  const { _id, email, title, desc, github, website, tags } = formData;
  // form onchange
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getProjectCurrent = (id) => {
    // console.log(id);
    dispatch(getProjectById(id));
  };
  // submit
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProject(formData));
    toast.success("Successfully Update your Project!!", { theme: "dark" });
    // console.log(formData);
  };
  return (
    <div className="mt-10 w-[100%] h-auto bg-slate-800 p-5 rounded-box shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center mb-5">
          <p className="text-lg md:text-xl text-white font-bold">{project.title}</p>
          <div className="ml-10 md:block hidden">
            {isSuccess ? (
              tagsArr &&
              tagsArr.map((tag) => (
                <span
                  className="badge m-1 badge-success cursor-pointer"
                  key={tag}
                >
                  {tag}
                </span>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex items-center">
          {user && user._id === project.userId && (
            <>
              <label htmlFor="my-update-modal">
                <i
                  className="fa-solid fa-pen-nib cursor-pointer hover:text-sky-400 mr-5"
                  onClick={() => getProjectCurrent(project._id)}
                ></i>
              </label>
              <i
                className="fa-solid fa-trash cursor-pointer hover:text-red-400"
                onClick={projectDelete}
              ></i>

              {/* edit project */}
              <input
                type="checkbox"
                id="my-update-modal"
                className="modal-toggle"
              />
              <div className="modal backdrop-blur-md bg-black/10 ">
                <div className="modal-box ">
                  <label
                    htmlFor="my-update-modal"
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h3 className="font-bold text-lg flex flex-col text-center mb-10">
                    Edit Project Details
                  </h3>
                  <form onSubmit={onSubmit}>
                    <div className="col-span-6 sm:col-span-3 mb-4">
                      <label className="text-gray-300">Project Title</label>
                      <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                        <span className="absolute left-4 h-6 flex items-center pr-4 border-r border-gray-500">
                          <i className="text-lg md:text-base fa-solid fa-heading"></i>
                        </span>{" "}
                        <input
                          type="text"
                          name="title"
                          id="title"
                          value={title}
                          autoComplete="title"
                          placeholder="Enter Your Project Title"
                          onChange={onChange}
                          className="block w-full  pl-16 pr-4 py-3 rounded-md border bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900  border-gray-600 focus:border-sky-300 text-base outline-none text-gray-300 leading-8 transition-colors duration-200 ease-in-out"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="text-gray-300">
                        Project Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          type="text"
                          name="desc"
                          id="desc"
                          value={desc}
                          autoComplete="desc"
                          onChange={onChange}
                          placeholder="Enter Brief Idea About Your Project"
                          className="block w-full pl-5 py-3 rounded-md border bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900  border-gray-600 focus:border-sky-300 text-base outline-none text-gray-100 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-400">
                        Brief description for your project.
                      </p>
                    </div>

                    <div className="col-span-6 sm:col-span-3 mb-4">
                      <label className="text-gray-300">Github</label>
                      <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                        <span className="absolute left-4 h-6 flex items-center pr-4 border-r border-gray-500">
                          <i className="text-lg md:text-base fa-brands fa-github"></i>
                        </span>{" "}
                        <input
                          type="text"
                          name="github"
                          id="github"
                          value={github}
                          autoComplete="github"
                          onChange={onChange}
                          placeholder="Github URL of project"
                          className="block w-full pl-16 pr-4 py-3 rounded-md border bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900  border-gray-600 focus:border-sky-500 text-base outline-none text-gray-300 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3 mb-4">
                      <label className="text-gray-300">Website</label>
                      <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                        <span className="absolute left-4 h-6 flex items-center pr-4 border-r border-gray-500">
                          <i className="text-lg md:text-base fa-solid fa-link"></i>
                        </span>{" "}
                        <input
                          type="text"
                          name="website"
                          id="website"
                          value={website}
                          autoComplete="website"
                          onChange={onChange}
                          placeholder="URL of Your Website"
                          className="block w-full pl-16 pr-4 py-3 rounded-md border bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900  border-gray-600 focus:border-sky-500 text-base outline-none text-gray-300 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label className="text-gray-300">Technology Stacks</label>
                      <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                        <span className="absolute left-4 h-6 flex items-center pr-4 border-r border-gray-500">
                          <i className="text-lg md:text-base fa-solid fa-list-check"></i>
                        </span>{" "}
                        <input
                          type="text"
                          name="tags"
                          id="tags"
                          value={tags}
                          autoComplete="tags"
                          onChange={onChange}
                          placeholder="Enter Technology Stacks"
                          className="block w-full pl-16 pr-4 py-3 rounded-md border bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900  border-gray-600 focus:border-sky-500 text-base outline-none text-gray-100 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-400">
                        Enter your Technology Stacks seperated by comma (' , ')
                        eg - html,css,reactjs
                      </p>
                    </div>
                    <div className="modal-action">
                      <button
                        className="btn btn-outline btn-info"
                        type="submit"
                      >
                        <i className="fa-solid fa-pen-nib mr-4"></i>
                        Update Project
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <p className="text-md text-gray-400">{project.desc}</p>

      <div className="flex items-center justify-center mt-4">
        {project.github ? (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={project.github}
            className="bg-base-100 p-2 rounded-full hover:bg-sky-900 mx-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-github"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
            </svg>
          </a>
        ) : (
          <></>
        )}
        {project.website ? (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={project.website}
            className="bg-base-100 p-2 rounded-full hover:bg-sky-900 mx-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-link"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
              <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
            </svg>
          </a>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ProjectTab;
