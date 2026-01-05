import React, { useEffect, useState } from 'react'
import { dummyStoriesData } from '../assets/assets'
import { Plus } from 'lucide-react'
import moment from 'moment'
import StoryModel from './StoryModel';
import StoryViewer from './StoryViewer';

function StoriesBar() {

    const [stories, setStories] = useState([]);
    const [showModel, setShowModel] = useState(false);
    const [viewStory, setViewStory] = useState(null);

    const fetchStories = async () => {
        setStories(dummyStoriesData);
    }

    useEffect(() => {
        fetchStories();
    }, [])

    return (
        <div className="w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl overflow-x-auto px-4 no-scrollbar">

            
            <div className="flex gap-4 flex-nowrap">

                {/*  CREATE STORY CARD */}
                <div onClick={()=>setShowModel(true)} className="relative shrink-0 w-28 h-40 rounded-xl border border-gray-200
                bg-linear-to-b from-indigo-50 to-white
                flex flex-col items-center justify-center gap-3
                cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1
                transition-all duration-200 active:scale-95">

                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shadow">
                        <Plus className="w-5 h-5 text-white" />
                    </div>

                    <p className="text-sm font-medium text-gray-700">
                        Create Story
                    </p>
                </div>

                {/*  STORY CARDS */}
                {stories.map((story, index) => (
                    <div onClick={()=>setViewStory(story)} key={index} className={`relative rounded-lg shadow min-w-30 max-w-30 max-h-40
                    cursor-pointer hover:shadow-lg transition-all duration-200
                    bg-linear-to-b from-indigo-500 to-purple-600
                    hover:from-indigo-700 hover:to-purple-800 active:scale-95`}>
                        <img src={story.user.profile_picture} alt="" className="absolute w-8 h-8 top-3 left-3 z-10 rounded-full ring-2 ring-gray-100 shadow" />

                        <p className="absolute top-18 left-3 text-white/60 text-sm truncate max-w-24">{story.content}</p>

                        <p className="text-white absolute bottom-1 right-2 z-10 text-xs">{moment(story.createdAt).fromNow()}</p>
                        {
                            story.media_type !== 'text' && (
                                <div className='absolute inset-0 z-1 rounded-lg bg-black overflow-hidden'>
                                    {
                                        story.media_type === "image" ?
                                            <img src={story.media_url} alt="" className='h-full w-full object-cover hover:scale-110 trnasition duration-500 opacity-70 hover:opacity-80' />
                                            :
                                            <video src={story.media_url} className='h-full w-full object-cover hover:scale-110 trnasition duration-500 opacity-70 hover:opacity-80' />
                                    }
                                </div>
                            )
                        }
                    </div>
                ))}

            </div>


            {/* add story model */}
            {
                showModel && <StoryModel setShowModel={setShowModel} fetchStories={fetchStories} />
            }

            {/* view Story model */}
            {
                viewStory && <StoryViewer viewStory={viewStory} setViewStory={setViewStory} />
            }
            
        </div>
    )
}

export default StoriesBar
