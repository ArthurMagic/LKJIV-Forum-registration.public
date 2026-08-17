'use client';

import {
  type ElementType,
  useEffect,
  useRef,
  useState,
  createElement,
  useCallback,
} from 'react';
import { gsap } from 'gsap';

interface TextSegment {
  content: string;
  className?: string;
}

interface TextTypeProps {
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string | React.ReactNode;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  text: string | TextSegment[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  variableSpeed?: {
    min: number;
    max: number;
  };
  startOnVisible?: boolean;
}

const TextType = ({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  variableSpeed,
  startOnVisible = false,
  ...props
}: TextTypeProps & React.HTMLAttributes<HTMLElement>) => {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);

  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  const segments: TextSegment[] =
    typeof text === 'string'
      ? [{ content: text }]
      : text;

  const fullText = segments.map(segment => segment.content).join('');

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;

    const { min, max } = variableSpeed;

    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  // Start when visible
  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [startOnVisible]);

  // Reset when text changes
  useEffect(() => {
    setDisplayedLength(0);
  }, [fullText]);

  // Type one character at a time
  useEffect(() => {
    if (!isVisible) return;

    if (displayedLength >= fullText.length) return;

    const delay =
      displayedLength === 0
        ? initialDelay
        : getRandomSpeed();

    const timeout = setTimeout(() => {
      setDisplayedLength(prev => prev + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [
    displayedLength,
    fullText,
    initialDelay,
    getRandomSpeed,
    isVisible,
  ]);

  // Cursor animation
  useEffect(() => {
    if (!showCursor || !cursorRef.current) return;

    const animation = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    });

    return () => animation.kill();
  }, [showCursor, cursorBlinkDuration]);

  // Render typed text while preserving segment classes
  let charactersLeft = displayedLength;

  const renderedText = segments.map((segment, index) => {
    if (charactersLeft <= 0) return null;

    const visibleCharacters = segment.content.slice(
      0,
      charactersLeft
    );

    charactersLeft -= visibleCharacters.length;

    return (
      <span
        key={index}
        className={segment.className}
      >
        {visibleCharacters}
      </span>
    );
  });

  const isTyping = displayedLength < fullText.length;

  const shouldHideCursor =
    hideCursorWhileTyping && isTyping;

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
      ...props,
    },
    <span className="inline">
      {renderedText}
    </span>,

    showCursor && (
      <span
        ref={cursorRef}
        className={`ml-1 inline-block ${
          shouldHideCursor ? 'hidden' : ''
        } ${cursorClassName}`}
      >
        {cursorCharacter}
      </span>
    )
  );
};

export default TextType;