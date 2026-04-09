// app/components/BacklogTab/SprintHeader.tsx
interface SprintHeaderProps {
  taskCount: number;
}

export function SprintHeader({ taskCount }: SprintHeaderProps) {
  return (
    <div className="rounded-lg border bg-card p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h3 className="text-base sm:text-lg font-semibold">
            Projei Sprint (PRP-Sprint 2){" "}
            <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/20 dark:text-green-400">
              Active
            </span>
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            2025-10-17 - 2025-10-24
          </p>
        </div>
        <div className="text-xs sm:text-sm text-muted-foreground">
          {taskCount} tasks
        </div>
      </div>
    </div>
  );
}