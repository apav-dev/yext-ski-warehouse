import React, { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { IoCaretDownOutline } from "react-icons/io5";
import cx from "classnames";
import { IoChatbubblesSharp } from "react-icons/io5";
import { getRuntime } from "@yext/pages/util";
import { z } from "zod";

interface IFrameParams {
  conversationId?: string;
  pageUrl?: string;
  referrerPageUrl?: string;
  visitorId?: string;
}

const EventDataSchema = z.object({
  data: z.object({
    id: z.string(),
  }),
  eventType: z.string(),
  source: z.string(),
});

const baseUrl = "https://yext-chatbot-prod.up.railway.app/bots";

export function ChatBot({ configId }: { configId: string }) {
  const runtime = getRuntime();
  const [showChat, setShowChat] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeParams, setIframeParams] = useState<IFrameParams>({});

  useEffect(() => {
    if (runtime.name === "browser") {
      const pageUrl = window.location.href;
      const referrerPageUrl = document.referrer;
      let conversationId: string | null =
        sessionStorage.getItem("conversationId");
      conversationId = conversationId === "undefined" ? null : conversationId;
      const visitorId = sessionStorage.getItem("visitorId");
      setIframeParams({
        pageUrl,
        referrerPageUrl,
        ...(conversationId && { conversationId }),
        ...(visitorId && { visitorId }),
      });
    }
  }, []);

  useEffect(() => {
    if (runtime.name === "browser") {
      const handleMessage = (event: MessageEvent) => {
        let parsedData;
        try {
          parsedData = EventDataSchema.parse(event.data);
        } catch (e) {
          return;
        }

        if (parsedData.eventType === "createNewConversation") {
          sessionStorage.setItem("conversationId", parsedData.data.id);
        }
      };

      window.addEventListener("message", handleMessage);
      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }
  }, [iframeRef.current]);

  const iFrameUrl = new URL(`${baseUrl}/${configId}`);
  const params = new URLSearchParams(
    Object.entries(iframeParams).filter(([_, value]) => value !== null)
  );
  iFrameUrl.search = params.toString();

  return (
    <div
      className={cx(
        "fixed z-50 bottom-6 right-4 lg:bottom-14 lg:right-10 2xl:right-auto 2xl:left-[80%]",
        showChat && "h-auto"
      )}
    >
      <Transition
        className="fixed right-4 bottom-24 lg:bottom-40 lg:right-10 w-80 lg:w-96 h-3/4 lg:h-2/3 xl:1/2  bg-white rounded-xl shadow-xl overflow-hidden"
        as="div"
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        show={showChat}
      >
        <iframe
          ref={iframeRef}
          className="w-full h-full"
          src={iFrameUrl.toString()}
        />
      </Transition>
      <button
        onClick={() => setShowChat(!showChat)}
        className="border border-white shadow-xl hover:shadow-2xl bottom-10 right-10 w-12 h-12 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-sky-400 to-sky-400 hover:-translate-y-2 transition-all duration-150"
      >
        <div className="flex flex-col justify-center items-center h-full w-full text-white">
          {showChat ? (
            <IoCaretDownOutline className="text-xl lg:text-3xl text-white" />
          ) : (
            <IoChatbubblesSharp className="text-xl lg:text-3xl text-white" />
          )}
        </div>
      </button>
    </div>
  );
}
