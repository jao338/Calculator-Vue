import gsap from 'gsap'
type GsapTarget = gsap.TweenTarget

type StepPreset = {
    steps: gsap.TweenVars[]
    repeat?: number
    yoyo?: boolean
    delay?: number
    defaults?: gsap.TweenVars
    onComplete?: gsap.Callback
}

type FlatPreset = gsap.TweenVars

const presets: Record<string, FlatPreset | StepPreset> = {
    shakeButtonSteps: {
        steps: [
            { scale: 1.005, rotationX: 1.3, rotationY: -1.3, rotationZ: 1.2, duration: 0.3, ease: 'sine.inOut' },
            { scale: 1.007, rotationX: -1.4, rotationY: 1.4, rotationZ: -1.2, duration: 0.3, ease: 'sine.inOut' },
            { scale: 1.006, rotationX: 1.5, rotationY: -1.5, rotationZ: 1.3, duration: 0.3, ease: 'sine.inOut' },
            { scale: 1.005, rotationX: -1.5, rotationY: 1.5, rotationZ: -1.3, duration: 0.3, ease: 'sine.inOut' },
            { scale: 1.007, rotationX: 1.4, rotationY: -1.4, rotationZ: 1.2, duration: 0.3, ease: 'sine.inOut' },
            { scale: 1.003, rotationX: -1.3, rotationY: 1.3, rotationZ: -1.2, duration: 0.3, ease: 'sine.inOut' },
            { scale: 1, rotationX: 0, rotationY: 0, rotationZ: 0, duration: 0.4, ease: 'sine.out' }
        ],
        repeat: -1,
        yoyo: true
    },
    shakeSimple: {
        duration: 2,
        repeat: -1,
        yoyo: true,
        rotate: -2,
        ease: 'power1.inOut'
    }
}

type AnimationPreset = keyof typeof presets
type AnimationMode = 'from' | 'to' | 'fromTo'

type TimelineOptions = {
    steps: gsap.TweenVars[]
    repeat?: number
    yoyo?: boolean
    delay?: number
    defaults?: gsap.TweenVars
    onComplete?: gsap.Callback
}

export const useAnimations = () => {
    const animate = (
        target: GsapTarget,
        preset: AnimationPreset | null = null,
        options: Partial<gsap.TweenVars> | TimelineOptions = {},
        mode: AnimationMode = 'from'
    ) => {
        const presetConfig = preset ? presets[preset] : null

        const hasSteps = (obj: any): obj is StepPreset => !!obj && Array.isArray(obj.steps)

        // Caso: preset com steps ou options com steps
        if (hasSteps(presetConfig) || ('steps' in options && Array.isArray((options as TimelineOptions).steps))) {
            const steps = hasSteps(presetConfig) ? presetConfig.steps : (options as TimelineOptions).steps
            const repeat = hasSteps(presetConfig) ? presetConfig.repeat ?? 0 : (options as TimelineOptions).repeat ?? 0
            const yoyo = hasSteps(presetConfig) ? presetConfig.yoyo ?? false : (options as TimelineOptions).yoyo ?? false
            const delay = hasSteps(presetConfig) ? presetConfig.delay ?? 0 : (options as TimelineOptions).delay ?? 0
            const defaults = hasSteps(presetConfig) ? presetConfig.defaults : (options as TimelineOptions).defaults
            const onComplete = hasSteps(presetConfig) ? presetConfig.onComplete : (options as TimelineOptions).onComplete

            const tl = gsap.timeline({
                repeat,
                yoyo,
                delay,
                ...(defaults ? { defaults } : {}),
                ...(onComplete ? { onComplete } : {})
            })

            for (const step of steps) {
                tl.to(target, step)
            }

            return tl
        }

        // fromTo (manual)
        if (mode === 'fromTo') {
            const { fromVars, toVars } = options as {
                fromVars: gsap.TweenVars
                toVars: gsap.TweenVars
            }

            if (!fromVars || !toVars) {
                console.warn(`'fromTo' mode requires both 'fromVars' and 'toVars'`)
                return
            }

            return gsap.fromTo(target, fromVars, toVars)
        }

        // from / to
        const flatConfig = presetConfig && !hasSteps(presetConfig) ? presetConfig : {}
        return gsap[mode](target, {
            ...flatConfig,
            ...(options as gsap.TweenVars)
        })
    }

    return { animate }
}
