'use client'

import { Trash2 } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import type { ChatSettings } from '@/lib/chat/types'

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  settings: ChatSettings
  onSettingsChange: (settings: ChatSettings) => void
  onClearAll: () => void
  conversationCount: number
}

export function SettingsDialog({
  open,
  onOpenChange,
  settings,
  onSettingsChange,
  onClearAll,
  conversationCount,
}: SettingsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Customize how GOAT responds in this session.</DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex flex-col divide-y divide-border rounded-xl border border-border">
          <SettingRow
            id="stream-responses"
            title="Stream responses"
            description="Reveal answers word by word as they generate."
            checked={settings.streamResponses}
            onCheckedChange={(checked) => onSettingsChange({ ...settings, streamResponses: checked })}
          />
          <SettingRow
            id="simulate-errors"
            title="Simulate network errors"
            description="Randomly fail responses to preview error handling."
            checked={settings.simulateErrors}
            onCheckedChange={(checked) => onSettingsChange({ ...settings, simulateErrors: checked })}
          />
        </div>

        <button
          type="button"
          onClick={() => {
            onClearAll()
            onOpenChange(false)
          }}
          disabled={conversationCount === 0}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-destructive/25 bg-destructive/[0.06] px-4 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/[0.12] disabled:pointer-events-none disabled:opacity-40"
        >
          <Trash2 className="size-4" />
          Clear all conversations
        </button>
      </DialogContent>
    </Dialog>
  )
}

function SettingRow({
  id,
  title,
  description,
  checked,
  onCheckedChange,
}: {
  id: string
  title: string
  description: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <div>
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {title}
        </label>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  )
}
