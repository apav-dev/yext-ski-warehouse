import React from "react";
import { useEffect, useState, useRef } from "react";
import { useChatState, useChatActions } from "@yext/chat-headless-react";
import MessageBubble from "./MessageBubble";
import { FaCircle, FaExclamationTriangle, FaSnowflake } from "react-icons/fa";
import { Transition } from "@headlessui/react";
import { getGreetingText } from "../../utils/getGreetingText";
import { twMerge } from "tailwind-merge";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";

const Chat = () => {
  const chat = useChatActions();

  const messages = useChatState((state) => state.conversation.messages);
  const loading = useChatState((state) => state.conversation.isLoading);

  const [input, setInput] = useState("");
  const [error, setError] = useState<boolean>(false);

  const [startChat, setStartChat] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingText, setGreetingText] = useState(getGreetingText());
  const [inputExpanded, setInputExpanded] = useState(false);

  // TODO: add check to make sure chat loaded
  const triggerChatFlow = async () => {
    setStartChat(true);
    // after 0.5s, show the greeting
    setTimeout(() => {
      setShowGreeting(true);
    }, 500);
    // after 300ms, hide the greeting and show the first message
    setTimeout(() => {
      setShowGreeting(false);
      setTimeout(() => {
        setGreetingText(messages[0].text);
        setShowGreeting(true);
        // after 2s, begin chat
        setTimeout(() => {
          setInputExpanded(true);
        }, 2000);
      }, 500);
    }, 2000);
  };

  // useEffect(() => {
  //   setStartGreeting(true);
  // }, []);

  useEffect(() => {
    chat.getNextMessage();
  }, [chat]);

  const sendMessage = async () => {
    setInput("");
    try {
      await chat.getNextMessage(input);
    } catch (e) {
      setError(true);
      return;
    }
    setError(false);
    return;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const bottomDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomDivRef.current) {
      setTimeout(() => {
        bottomDivRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100); // Adjust this delay as needed
    }
  }, [messages, loading]);

  return (
    <div className="bg-gray-900">
      <div className="relative isolate overflow-hidden pt-14">
        <img
          src="https://a.mktgcdn.com/p/vBqAAeERK_DkUHW4Y-CzJJASOt2gDP3B-PzjwDZy8js/3021x3349.jpg"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <Transition
          show={startChat}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="absolute inset-0 bg-gradient-to-b from-gray-700/50 via-gray-900/70 to-black/80 bg-opacity-50"
        >
          <div className="h-full w-full relative">
            <Transition
              show={showGreeting}
              enter="transition-all ease-out duration-300"
              enterFrom="opacity-0 translate-y-2"
              enterTo="opacity-100 translate-y-0"
              leave="transition-all ease-in duration-300"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-2"
            >
              <div
                className={twMerge(
                  "absolute transition-all duration-1000 text-3xl left-0 right-0",
                  !inputExpanded && "top-64",
                  inputExpanded &&
                    "top-4 transform md:-translate-x-[15%] lg:-translate-x-1/4 "
                )}
              >
                <div className="flex justify-center">
                  <p
                    className={twMerge(
                      "transition-all duration-1000 font-bold text-white text-center ",
                      messages?.[0]?.text !== greetingText && "text-6xl",
                      inputExpanded &&
                        "p-2 bg-gray-100 rounded-2xl text-sm text-gray-900 font-normal md:p-4 md:text-base"
                    )}
                  >
                    {greetingText}
                  </p>
                </div>
              </div>
            </Transition>
          </div>
        </Transition>
        {/* chat */}
        <div className="mx-auto max-w-2xl ">
          <div className="w-full flex flex-col overflow-auto bg-transparent">
            <div className="mx-auto max-w-5xl h-96 mt-auto w-full flex flex-col gap-y-6 py-2 mb-28 px-4">
              <div className="hidden">
                {messages.map((message, index) => (
                  <MessageBubble key={index} index={index} message={message} />
                ))}
                {loading && (
                  <Transition
                    show={loading}
                    appear={true}
                    enter="transition-opacity duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    className="w-fit flex gap-1 rounded-3xl p-3 text-[8px] text-gray-500 bg-gray-100"
                  >
                    <FaCircle
                      className="animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <FaCircle
                      className="animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                    <FaCircle
                      className="animate-bounce"
                      style={{ animationDelay: "600ms" }}
                    />
                  </Transition>
                )}
                {error && (
                  <Transition
                    show={error}
                    appear={true}
                    enter="transition-opacity duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    className="w-fit flex flex-row gap-1 rounded-md bg-red-100 p-4 text-red-600 text-base "
                  >
                    <div className="my-auto">
                      <FaExclamationTriangle />
                    </div>
                    <div className="">Oops, something went wrong.</div>
                  </Transition>
                )}
                <div className="pb-2" ref={bottomDivRef} />
              </div>
            </div>
          </div>
          <div className="w-full max-w-5xl flex relative p-4">
            <Transition
              as="div"
              show={inputExpanded}
              enter="transition-all duration-500"
              enterFrom="w-8"
              enterTo="flex-1"
              leave="transition-all duration-500"
              leaveFrom="flex-1"
              leaveTo="w-0"
              className="overflow-hidden"
            >
              <div className="border border-gray-300 p-4 disabled:bg-gray-50 rounded-3xl bg-white flex">
                <FaSnowflake className="inline-block text-sky-400 mr-2 h-6 w-6" />

                <input
                  autoFocus
                  disabled={loading}
                  onKeyDown={handleKeyDown}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 pr-8 outline-none bg-transparent"
                  placeholder="Type a message..."
                />
              </div>
            </Transition>
            <Transition
              show={input.length > 0}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-1"
              className="rounded-full mx-auto text-white disabled:bg-gray-100 text-xl absolute right-7 top-8 my-auto"
            >
              <button disabled={loading} onClick={sendMessage}>
                <ArrowUpCircleIcon className="h-7 w-7 text-sky-400 hover:text-sky-700" />
              </button>
            </Transition>
          </div>
        </div>
        {/* absolute button in the bottom right */}
        <div className="absolute bottom-0 right-0">
          <button
            onClick={triggerChatFlow}
            className="bg-white rounded-full p-4 m-4"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
