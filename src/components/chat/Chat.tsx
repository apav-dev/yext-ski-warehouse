import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useChatState, useChatActions } from "@yext/chat-headless-react";
import { FaExclamationTriangle, FaSnowflake } from "react-icons/fa";
import { Transition } from "@headlessui/react";
import { getGreetingText } from "../../utils/getGreetingText";
import { twMerge } from "tailwind-merge";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import LoadingBubble from "./LoadingBubble";
import InvoiceWidget from "./widgets/InvoiceWidget";
import MessageBubble from "./MessageBubble";
import ProductWidget from "./widgets/ProductWidget";
import { VerticalResultsSchema } from "../../schema/VerticalResultsSchema";

function delay(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

const Chat = () => {
  const chat = useChatActions();

  const messages = useChatState((state) => state.conversation.messages);
  const loading = useChatState((state) => state.conversation.isLoading);
  const queryResult = useChatState(
    (state) => state.conversation.notes?.queryResult
  );
  const currentStepIndices = useChatState(
    (state) => state.conversation.notes?.currentStepIndices
  );
  const currentGoal = useChatState(
    (state) => state.conversation.notes?.currentGoal
  );

  const [input, setInput] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [firstMessage, setFirstMessage] = useState("");
  const [startChat, setStartChat] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingText, setGreetingText] = useState(getGreetingText());
  const [inputExpanded, setInputExpanded] = useState(false);
  const [renderedMessages, setRenderedMessages] = useState<React.ReactNode[]>(
    []
  );

  useEffect(() => {
    const customerId = localStorage.getItem("ski_warehouse_customer_id");
    if (customerId) {
      chat.setContext({
        customerId,
      });
    }
    chat.getNextMessage();
  }, [chat]);

  useEffect(() => {
    if (!firstMessage && messages.length > 0) {
      setFirstMessage(messages[0].text);
    } else {
      const newMessage = (
        <MessageBubble
          key={`message-${messages.length - 1}`}
          showThumbStatus
          message={messages[messages.length - 1]}
        />
      );

      setRenderedMessages((prev) => [...prev, newMessage]);
    }
  }, [messages]);

  useEffect(() => {
    if ((currentStepIndices?.length || 0) === 2 && queryResult?.orders) {
      // TODO: zod validation for order history
      const newMessage = (
        <InvoiceWidget
          message={messages[messages.length - 1]}
          paymentRecord={queryResult.orders[0]}
        />
      );
      setRenderedMessages((prev) => [...prev, newMessage]);
    }
    if (currentGoal === "RECOMMEND-SKIS" && queryResult) {
      const parsedResults = VerticalResultsSchema.safeParse(queryResult);
      if (parsedResults.success) {
        const products = parsedResults.data.response.results.map(
          (searchResult) => searchResult.data
        );
        const newMessage = <ProductWidget products={products} />;
        setRenderedMessages((prev) => [...prev, newMessage]);
      }
    }
  }, [currentStepIndices, queryResult, currentGoal]);

  useEffect(() => {
    async function triggerAnimations() {
      setStartChat(true);
      await delay(500);
      setShowGreeting(true);
      await delay(2000);
      setShowGreeting(false);
      await delay(500);
      setGreetingText(firstMessage);
      setShowGreeting(true);
      await delay(2000);
      setInputExpanded(true);
    }

    triggerAnimations();
  }, [firstMessage]);

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

  const messagesDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollChatToBottom = () => {
      if (messagesDivRef.current) {
        const div = messagesDivRef.current;
        const isScrolledToBottom =
          div.scrollHeight - div.clientHeight <= div.scrollTop + 1;

        // Scroll to the bottom if already at the bottom or if the content overflows
        if (isScrolledToBottom || div.scrollHeight > div.clientHeight) {
          smoothScrollToBottom(div);
        }
      }
    };

    setTimeout(scrollChatToBottom, 50);
  }, [messages, loading, renderedMessages]);

  const smoothScrollToBottom = (element: HTMLElement): void => {
    const targetPosition = element.scrollHeight;
    const startPosition = element.scrollTop;
    const distance = targetPosition - startPosition;
    const duration = 800; // This can be adjusted
    let start: number | null = null;

    const step = (timestamp: number): void => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      element.scrollTop = startPosition + easedProgress * distance;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  return (
    <div className="bg-gray-900 flex h-full flex-col">
      <div className="relative isolate overflow-hidden pt-14 h-[700px]">
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
                  !inputExpanded && "top-64 px-32",
                  inputExpanded && "top-0 px-16 bottom-0"
                )}
              >
                <div
                  ref={messagesDivRef}
                  className="max-h-[700px] overflow-y-auto pb-24 pt-8"
                >
                  <div className="flex flex-col gap-y-6 justify-center h-full">
                    <p
                      className={twMerge(
                        "transition-all duration-1000 font-bold text-white text-center w-fit",

                        inputExpanded &&
                          "p-2 bg-gray-100 rounded-2xl text-sm text-gray-900 font-semibold md:p-4 md:text-base"
                      )}
                    >
                      <span
                        className={twMerge(
                          firstMessage !== greetingText && "text-6xl"
                        )}
                      >
                        {greetingText}
                      </span>
                    </p>
                    {renderedMessages.slice(1)}
                    {loading && firstMessage && <LoadingBubble />}
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
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </Transition>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-gray-900/50 to-black/80">
          <div className="w-full max-w-5xl flex relative p-4 mx-auto">
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
      </div>
    </div>
  );
};

export default Chat;
