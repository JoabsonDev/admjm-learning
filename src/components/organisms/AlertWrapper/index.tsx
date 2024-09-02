import Alert from "@molecules/Alert"
import { useAlertStore } from "@store/alert"
import { ComponentProps, useState } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "fixed right-0 top-16 z-50 min-w-60 pr-4"
})

type AlertWrapperProps = ComponentProps<"div"> & VariantProps<typeof variants>

export default function AlertWrapper({
  className,
  ...rest
}: AlertWrapperProps) {
  const { alerts, removeAlert } = useAlertStore()
  const [removingAlertId, setRemovingAlertId] = useState<number | null>(null)

  const handleAnimationEnd = (
    event: React.AnimationEvent<HTMLDivElement>,
    id: number
  ) => {
    if (event.animationName === "slide-out" && id === removingAlertId) {
      removeAlert(id)
      setRemovingAlertId(null)
    }
  }

  return (
    <div
      className={variants({ className })}
      {...rest}
    >
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`transition-transform duration-300 ease-in-out ${
            alert.id === removingAlertId
              ? "animate-slide-out"
              : "animate-slide-in"
          } mb-2`}
          onAnimationEnd={(event) => handleAnimationEnd(event, alert.id!)}
        >
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => {
              setRemovingAlertId(alert.id!)
              removeAlert(alert.id!)
            }}
          />
        </div>
      ))}
    </div>
  )
}
