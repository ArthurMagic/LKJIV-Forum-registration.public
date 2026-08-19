import React, {
    useState,
    Children,
    useRef,
    useLayoutEffect,
    useImperativeHandle,
    forwardRef,
    type HTMLAttributes,
    type ReactNode
} from 'react';

import {
    motion,
    AnimatePresence,
    type Variants
} from 'motion/react';


// ============================================================
// STEPPER REF API
// ============================================================

export interface StepperRef {
    next: () => void;
    previous: () => void;
    goToStep: (step: number) => void;
    complete: () => void;
    getCurrentStep: () => number;
}


// ============================================================
// PROPS
// ============================================================

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;

    initialStep?: number;

    onStepChange?: (step: number) => void;

    onFinalStepCompleted?: () => void;

    stepCircleContainerClassName?: string;

    stepContainerClassName?: string;

    contentClassName?: string;

    footerClassName?: string;

    backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;

    backButtonText?: string;

    disableStepIndicators?: boolean;

    renderStepIndicator?: (props: {
        step: number;
        currentStep: number;
        onStepClick: (clicked: number) => void;
    }) => ReactNode;
}


// ============================================================
// STEPPER
// ============================================================

const Stepper = forwardRef<StepperRef, StepperProps>(
    function Stepper(
        {
            children,
            initialStep = 1,

            onStepChange = () => { },

            onFinalStepCompleted = () => { },

            stepCircleContainerClassName = '',

            stepContainerClassName = '',

            contentClassName = '',

            footerClassName = '',

            backButtonProps = {},

            backButtonText = 'Back',

            disableStepIndicators = false,

            renderStepIndicator,

            ...rest
        },

        ref
    ) {
        const [currentStep, setCurrentStep] =
            useState<number>(initialStep);

        const [direction, setDirection] =
            useState<number>(0);

        const stepsArray = Children.toArray(children);

        const totalSteps = stepsArray.length;

        const isCompleted =
            currentStep > totalSteps;


        // ========================================================
        // UPDATE STEP
        // ========================================================

        const updateStep = (newStep: number) => {
            const clampedStep = Math.max(
                1,
                Math.min(
                    newStep,
                    totalSteps + 1
                )
            );

            setCurrentStep(clampedStep);

            if (clampedStep > totalSteps) {
                onFinalStepCompleted();
            } else {
                onStepChange(clampedStep);
            }
        };


        // ========================================================
        // NEXT
        // ========================================================

        const handleNext = () => {
            if (currentStep >= totalSteps) {
                return;
            }

            setDirection(-1);

            updateStep(
                currentStep + 1
            );
        };


        // ========================================================
        // PREVIOUS
        // ========================================================

        const handlePrevious = () => {
            if (currentStep <= 1) {
                return;
            }

            setDirection(1);

            updateStep(
                currentStep - 1
            );
        };


        // ========================================================
        // GO TO STEP
        // ========================================================

        const handleGoToStep = (
            step: number
        ) => {
            // Nach Abschluss komplett gesperrt
            if (isCompleted) {
                return;
            }

            // Ungültiger Step
            if (
                step < 1 ||
                step > totalSteps
            ) {
                return;
            }

            // Aktuellen Step nicht anklicken
            if (step === currentStep) {
                return;
            }

            // Nur zurückgehen erlauben
            if (step > currentStep) {
                return;
            }

            setDirection(-1);

            updateStep(step);
        };


        // ========================================================
        // COMPLETE
        // ========================================================

        const handleComplete = () => {
            if (isCompleted) {
                return;
            }

            setDirection(1);

            updateStep(
                totalSteps + 1
            );
        };


        // ========================================================
        // REF API
        // ========================================================

        useImperativeHandle(
            ref,

            () => ({
                next: handleNext,

                previous: handlePrevious,

                goToStep: handleGoToStep,

                complete: handleComplete,

                getCurrentStep: () =>
                    currentStep
            }),

            [
                currentStep,
                totalSteps
            ]
        );


        // ========================================================
        // RENDER
        // ========================================================

        return (
            <div
                className="
                    flex
                    min-h-screen
                    w-full
                    items-center
                    justify-center
                    p-4
                "

                {...rest}
            >

                {/* ==================================================
                    STEPPER CONTAINER

                    KEIN min-h-screen!
                    Dadurch passt sich die Box dem Inhalt an.
                ================================================== */}

                <div
                    className={`
                        flex
                        w-full
                        max-w-6xl
                        flex-col
                        overflow-hidden
                        rounded-4xl
                        bg-white/50
                        backdrop-blur-md
                        shadow-xl
                        p-4
                        ${stepCircleContainerClassName}
                    `}

                    style={{
                        border: '1px solid #111827'
                    }}
                >


                    {/* ==================================================
                        STEP INDICATORS
                    ================================================== */}

                    <div
                        className={`
                            flex
                            w-full
                            items-center
                            p-8

                            ${stepContainerClassName}
                        `}
                    >

                        {stepsArray.map(
                            (_, index) => {

                                const stepNumber =
                                    index + 1;

                                const isNotLastStep =
                                    index <
                                    totalSteps - 1;


                                return (
                                    <React.Fragment
                                        key={stepNumber}
                                    >

                                        {/* ============================
                                            INDICATOR
                                        ============================ */}

                                        {renderStepIndicator ? (

                                            renderStepIndicator({
                                                step: stepNumber,

                                                currentStep,

                                                onStepClick:
                                                    handleGoToStep
                                            })

                                        ) : (

                                            <StepIndicator
                                                step={stepNumber}
                                                currentStep={currentStep}
                                                disableStepIndicators={
                                                    disableStepIndicators ||
                                                    isCompleted ||
                                                    stepNumber > currentStep
                                                }
                                                onClickStep={handleGoToStep}
                                            />

                                        )}


                                        {/* ============================
                                            CONNECTOR
                                        ============================ */}

                                        {isNotLastStep && (

                                            <StepConnector
                                                isComplete={
                                                    currentStep >
                                                    stepNumber
                                                }
                                            />

                                        )}

                                    </React.Fragment>
                                );
                            }
                        )}

                    </div>


                    {/* ==================================================
                        CONTENT
                    ================================================== */}

                    <StepContentWrapper
                        isCompleted={
                            isCompleted
                        }

                        currentStep={
                            currentStep
                        }

                        direction={
                            direction
                        }

                        className={`
                            w-full
                            px-8
                            pb-2

                            ${contentClassName}
                        `}
                    >

                        {
                            stepsArray[
                            currentStep - 1
                            ]
                        }


                    </StepContentWrapper>


                    {/* ==================================================
                        FOOTER
                    ================================================== */}

                    {!isCompleted && (

                        <div
                            className={`
                                px-8
                                pb-8

                                ${footerClassName}
                            `}
                        >

                            <div
                                className="
                                    mt-6
                                    flex
                                    justify-start
                                "
                            >

                                {currentStep !== 1 && (

                                    <button
                                        type="button"

                                        onClick={
                                            handlePrevious
                                        }

                                        className="
                                            rounded
                                            px-2
                                            py-1
                                            text-neutral-400
                                            transition
                                            duration-300
                                            hover:text-neutral-700
                                        "

                                        {...backButtonProps}
                                    >

                                        {
                                            backButtonText
                                        }

                                    </button>

                                )}

                            </div>

                        </div>

                    )}

                </div>

            </div>
        );
    }
);


export default Stepper;


// ============================================================
// STEP CONTENT WRAPPER
// ============================================================

interface StepContentWrapperProps {
    isCompleted: boolean;

    currentStep: number;

    direction: number;

    children: ReactNode;

    className?: string;
}


function StepContentWrapper({
    isCompleted,
    currentStep,
    direction,
    children,
    className = ''
}: StepContentWrapperProps) {

    const [parentHeight, setParentHeight] =
        useState<number>(0);

    const handleHeightChange = (
        height: number
    ) => {
        setParentHeight(height);
    };

    return (
        <motion.div
            className={`
                relative
                w-full
                overflow-hidden

                ${className}
            `}

            animate={{
                height: isCompleted
                    ? 'auto'
                    : parentHeight
            }}

            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30
            }}
        >

            <AnimatePresence
                initial={false}
                mode="sync"
                custom={direction}
            >

                {isCompleted ? (

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 10
                        }}

                        animate={{
                            opacity: 1,
                            y: 0
                        }}

                        transition={{
                            duration: 0.4
                        }}

                        className="
                            flex
                            w-full
                            items-center
                            justify-center
                            py-8
                        "
                    >
                        <img src='../public/fast-cat-cat-excited.gif'></img>
                    </motion.div>

                ) : (

                    <SlideTransition
                        key={currentStep}

                        direction={direction}

                        onHeightReady={
                            handleHeightChange
                        }
                    >
                        {children}
                    </SlideTransition>

                )}

            </AnimatePresence>

        </motion.div>
    );
}


// ============================================================
// SLIDE TRANSITION
// ============================================================

interface SlideTransitionProps {
    children: ReactNode;

    direction: number;

    onHeightReady: (
        height: number
    ) => void;
}


function SlideTransition({
    children,

    direction,

    onHeightReady
}: SlideTransitionProps) {

    const containerRef =
        useRef<HTMLDivElement | null>(
            null
        );


    useLayoutEffect(() => {

        const element =
            containerRef.current;

        if (!element) {
            return;
        }


        const updateHeight = () => {
            onHeightReady(
                element.offsetHeight
            );
        };


        updateHeight();


        // ======================================================
        // ResizeObserver
        //
        // Falls sich der Inhalt nach dem Rendern verändert,
        // wird die Höhe automatisch neu gemessen.
        // ======================================================

        const resizeObserver =
            new ResizeObserver(
                updateHeight
            );

        resizeObserver.observe(
            element
        );


        return () => {
            resizeObserver.disconnect();
        };

    }, [
        children,
        onHeightReady
    ]);


    return (
        <motion.div
            ref={containerRef}

            custom={direction}

            variants={stepVariants}

            initial="enter"

            animate="center"

            exit="exit"

            transition={{
                duration: 0.4,

                ease: 'easeInOut'
            }}

            style={{
                position: 'absolute',

                left: 0,

                right: 0,

                top: 0
            }}
        >

            {children}

        </motion.div>
    );
}


// ============================================================
// STEP ANIMATION
// ============================================================

const stepVariants: Variants = {

    enter: (
        dir: number
    ) => ({

        x:
            dir >= 0
                ? '-100%'
                : '100%',

        opacity: 0

    }),


    center: {

        x: '0%',

        opacity: 1

    },


    exit: (
        dir: number
    ) => ({

        x:
            dir >= 0
                ? '50%'
                : '-50%',

        opacity: 0

    })

};


// ============================================================
// STEP
// ============================================================

interface StepProps {
    children: ReactNode;
}


export function Step({
    children
}: StepProps) {

    return (
        <div className="w-full">
            {children}
        </div>
    );
}


// ============================================================
// STEP INDICATOR
// ============================================================

interface StepIndicatorProps {
    step: number;

    currentStep: number;

    onClickStep: (
        clicked: number
    ) => void;

    disableStepIndicators?: boolean;
}


function StepIndicator({
    step,

    currentStep,

    onClickStep,

    disableStepIndicators = false
}: StepIndicatorProps) {

    const status =
        currentStep === step
            ? 'active'
            : currentStep < step
                ? 'inactive'
                : 'complete';


    const handleClick = () => {

        if (
            disableStepIndicators
        ) {
            return;
        }

        if (
            step === currentStep
        ) {
            return;
        }

        onClickStep(step);
    };


    return (
        <button
            type="button"

            onClick={
                handleClick
            }

            disabled={
                disableStepIndicators
            }

            aria-label={
                `Go to step ${step}`
            }

            className={`
                relative
                flex
                shrink-0
                items-center
                justify-center
                outline-none

                ${disableStepIndicators
                    ? `
                            cursor-not-allowed
                            opacity-50
                        `
                    : `
                            cursor-pointer
                        `
                }
            `}
        >

            <motion.div
                animate={status}

                initial={false}

                variants={{
                    inactive: {
                        scale: 1,

                        backgroundColor:
                            '#111827',

                        color:
                            '#E30613'
                    },

                    active: {
                        scale: 1,

                        backgroundColor:
                            '#E30613',

                        color:
                            '#111827'
                    },

                    complete: {
                        scale: 1,

                        backgroundColor:
                            '#E30613',

                        color:
                            '#111827'
                    }
                }}

                transition={{
                    duration: 0.3
                }}

                className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    font-semibold
                "
            >

                {status === 'complete' ? (

                    <CheckIcon
                        className="
                            h-4
                            w-4
                            text-black
                        "
                    />

                ) : status === 'active' ? (

                    <div
                        className="
                            h-3
                            w-3
                            rounded-full
                            bg-[#120F17]
                        "
                    />

                ) : (

                    <span
                        className="
                            text-sm
                        "
                    >
                        {step}
                    </span>

                )}

            </motion.div>

        </button>
    );
}


// ============================================================
// STEP CONNECTOR
// ============================================================

interface StepConnectorProps {
    isComplete: boolean;
}


function StepConnector({
    isComplete
}: StepConnectorProps) {

    const lineVariants: Variants = {

        incomplete: {

            width: 0,

            backgroundColor:
                'transparent'

        },

        complete: {

            width: '100%',

            backgroundColor:
                '#111827'

        }

    };


    return (
        <div
            className="
                relative
                mx-2
                h-0.5
                min-w-4
                flex-1
                overflow-hidden
                rounded
                bg-neutral-600
            "
        >

            <motion.div
                className="
                    absolute
                    left-0
                    top-0
                    h-full
                "

                variants={
                    lineVariants
                }

                initial={false}

                animate={
                    isComplete
                        ? 'complete'
                        : 'incomplete'
                }

                transition={{
                    duration: 0.4
                }}
            />

        </div>
    );
}


// ============================================================
// CHECK ICON
// ============================================================

interface CheckIconProps
    extends React.SVGProps<SVGSVGElement> { }


function CheckIcon(
    props: CheckIconProps
) {

    return (
        <svg
            {...props}

            fill="none"

            stroke="currentColor"

            strokeWidth={2}

            viewBox="0 0 24 24"
        >

            <motion.path
                initial={{
                    pathLength: 0
                }}

                animate={{
                    pathLength: 1
                }}

                transition={{
                    delay: 0.1,

                    type: 'tween',

                    ease: 'easeOut',

                    duration: 0.3
                }}

                strokeLinecap="round"

                strokeLinejoin="round"

                d="M5 13l4 4L19 7"
            />

        </svg>
    );
}