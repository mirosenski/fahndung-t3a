"use client"

import { useState } from "react"
import { 
  Flex, 
  Text, 
  Button, 
  Card, 
  Heading, 
  Checkbox, 
  Switch, 
  Badge, 
  Avatar, 
  AlertDialog, 
  Dialog, 
  Tabs, 
  Table, 
  ThemePanel 
} from "@radix-ui/themes"
import { 
  Button as ShadcnButton, 
  Card as ShadcnCard, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox as ShadcnCheckbox,
  Switch as ShadcnSwitch,
  Badge as ShadcnBadge,
  Avatar as ShadcnAvatar,
  AvatarFallback,
  AvatarImage,
  AlertDialog as ShadcnAlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Dialog as ShadcnDialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Tabs as ShadcnTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Table as ShadcnTable,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "~/components/ui"

export default function RadixDemoPage() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Radix Themes vs. shadcn/ui Demo</h1>
        <p className="text-muted-foreground">
          Vergleich beider Komponenten-Systeme
        </p>
      </div>

      {/* Buttons Vergleich */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <Heading size="6" mb="4">Radix Themes Buttons</Heading>
          <Flex direction="column" gap="3">
            <Button>Default Button</Button>
            <Button variant="solid" color="red">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="soft">Soft</Button>
            <Button variant="ghost">Ghost</Button>
            <Flex gap="2">
              <Button size="1">Small</Button>
              <Button size="2">Medium</Button>
              <Button size="3">Large</Button>
            </Flex>
          </Flex>
        </Card>

        <ShadcnCard>
          <CardHeader>
            <CardTitle>shadcn/ui Buttons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ShadcnButton>Default Button</ShadcnButton>
            <ShadcnButton variant="destructive">Destructive</ShadcnButton>
            <ShadcnButton variant="outline">Outline</ShadcnButton>
            <ShadcnButton variant="secondary">Secondary</ShadcnButton>
            <ShadcnButton variant="ghost">Ghost</ShadcnButton>
            <div className="flex gap-2">
              <ShadcnButton size="sm">Small</ShadcnButton>
              <ShadcnButton size="default">Medium</ShadcnButton>
              <ShadcnButton size="lg">Large</ShadcnButton>
            </div>
          </CardContent>
        </ShadcnCard>
      </div>

      {/* Forms Vergleich */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <Heading size="6" mb="4">Radix Themes Forms</Heading>
          <Flex direction="column" gap="3">
            <Flex gap="2" align="center">
              <Checkbox defaultChecked />
              <Text size="2">Checkbox</Text>
            </Flex>
            <Flex gap="2" align="center">
              <Switch defaultChecked />
              <Text size="2">Switch</Text>
            </Flex>
          </Flex>
        </Card>

        <ShadcnCard>
          <CardHeader>
            <CardTitle>shadcn/ui Forms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Email eingeben..." />
            </div>
            <div className="space-y-2">
              <Label>Select</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Option wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <ShadcnCheckbox id="checkbox" />
              <Label htmlFor="checkbox">Checkbox</Label>
            </div>
            <div className="flex items-center space-x-2">
              <ShadcnSwitch id="switch" />
              <Label htmlFor="switch">Switch</Label>
            </div>
          </CardContent>
        </ShadcnCard>
      </div>

      {/* Data Display Vergleich */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <Heading size="6" mb="4">Radix Themes Data Display</Heading>
          <Flex direction="column" gap="3">
            <Flex gap="2">
              <Badge>Default</Badge>
              <Badge color="red">Error</Badge>
              <Badge color="green">Success</Badge>
            </Flex>
            <Flex gap="3" align="center">
              <Avatar size="3" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" fallback="A" />
              <div>
                <Text as="div" size="2" weight="bold">Max Mustermann</Text>
                <Text as="div" size="2" color="gray">max@example.com</Text>
              </div>
            </Flex>
          </Flex>
        </Card>

        <ShadcnCard>
          <CardHeader>
            <CardTitle>shadcn/ui Data Display</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <ShadcnBadge>Default</ShadcnBadge>
              <ShadcnBadge variant="destructive">Error</ShadcnBadge>
              <ShadcnBadge variant="secondary">Success</ShadcnBadge>
            </div>
            <div className="flex items-center space-x-3">
              <ShadcnAvatar>
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback>MM</AvatarFallback>
              </ShadcnAvatar>
              <div>
                <p className="text-sm font-medium">Max Mustermann</p>
                <p className="text-xs text-muted-foreground">max@example.com</p>
              </div>
            </div>
          </CardContent>
        </ShadcnCard>
      </div>

      {/* Dialogs Vergleich */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <Heading size="6" mb="4">Radix Themes Dialogs</Heading>
          <Flex gap="3">
            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button variant="outline" color="red">Löschen</Button>
              </AlertDialog.Trigger>
              <AlertDialog.Content>
                <AlertDialog.Title>Bist du sicher?</AlertDialog.Title>
                <AlertDialog.Description>
                  Diese Aktion kann nicht rückgängig gemacht werden.
                </AlertDialog.Description>
                <Flex gap="3" mt="4" justify="end">
                  <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">Abbrechen</Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                    <Button color="red">Löschen</Button>
                  </AlertDialog.Action>
                </Flex>
              </AlertDialog.Content>
            </AlertDialog.Root>

            <Dialog.Root>
              <Dialog.Trigger>
                <Button variant="outline">Dialog öffnen</Button>
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Title>Dialog Titel</Dialog.Title>
                <Dialog.Description>
                  Dies ist ein Beispiel-Dialog mit Inhalt.
                </Dialog.Description>
                <Flex gap="3" mt="4" justify="end">
                  <Dialog.Close>
                    <Button variant="soft" color="gray">Abbrechen</Button>
                  </Dialog.Close>
                  <Button>Bestätigen</Button>
                </Flex>
              </Dialog.Content>
            </Dialog.Root>
          </Flex>
        </Card>

        <ShadcnCard>
          <CardHeader>
            <CardTitle>shadcn/ui Dialogs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <ShadcnAlertDialog>
                <AlertDialogTrigger asChild>
                  <ShadcnButton variant="outline">Löschen</ShadcnButton>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Bist du sicher?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Diese Aktion kann nicht rückgängig gemacht werden.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                    <AlertDialogAction>Löschen</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </ShadcnAlertDialog>

              <ShadcnDialog>
                <DialogTrigger asChild>
                  <ShadcnButton variant="outline">Dialog öffnen</ShadcnButton>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dialog Titel</DialogTitle>
                    <DialogDescription>
                      Dies ist ein Beispiel-Dialog mit Inhalt.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <ShadcnButton variant="outline">Abbrechen</ShadcnButton>
                    <ShadcnButton>Bestätigen</ShadcnButton>
                  </DialogFooter>
                </DialogContent>
              </ShadcnDialog>
            </div>
          </CardContent>
        </ShadcnCard>
      </div>

      {/* Tabs Vergleich */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <Heading size="6" mb="4">Radix Themes Tabs</Heading>
          <Tabs.Root defaultValue="account">
            <Tabs.List>
              <Tabs.Trigger value="account">Account</Tabs.Trigger>
              <Tabs.Trigger value="password">Password</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="account">
              <Flex direction="column" gap="2" mt="4">
                <Text size="2" weight="bold">Account</Text>
                <Text size="2" color="gray">Hier stehen die Account-Einstellungen.</Text>
              </Flex>
            </Tabs.Content>
            <Tabs.Content value="password">
              <Flex direction="column" gap="2" mt="4">
                <Text size="2" weight="bold">Password</Text>
                <Text size="2" color="gray">Hier stehen die Passwort-Einstellungen.</Text>
              </Flex>
            </Tabs.Content>
          </Tabs.Root>
        </Card>

        <ShadcnCard>
          <CardHeader>
            <CardTitle>shadcn/ui Tabs</CardTitle>
          </CardHeader>
          <CardContent>
            <ShadcnTabs defaultValue="account" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Account</h4>
                  <p className="text-sm text-muted-foreground">
                    Hier stehen die Account-Einstellungen.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="password">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Password</h4>
                  <p className="text-sm text-muted-foreground">
                    Hier stehen die Passwort-Einstellungen.
                  </p>
                </div>
              </TabsContent>
            </ShadcnTabs>
          </CardContent>
        </ShadcnCard>
      </div>

      {/* Tables Vergleich */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <Heading size="6" mb="4">Radix Themes Table</Heading>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Rechnung</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Methode</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Betrag</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>INV001</Table.Cell>
                <Table.Cell><Badge color="green">Bezahlt</Badge></Table.Cell>
                <Table.Cell>Kreditkarte</Table.Cell>
                <Table.Cell>€250,00</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>INV002</Table.Cell>
                <Table.Cell><Badge color="yellow">Ausstehend</Badge></Table.Cell>
                <Table.Cell>PayPal</Table.Cell>
                <Table.Cell>€150,00</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Card>

        <ShadcnCard>
          <CardHeader>
            <CardTitle>shadcn/ui Table</CardTitle>
          </CardHeader>
          <CardContent>
            <ShadcnTable>
              <TableCaption>Eine Liste der letzten Rechnungen.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Rechnung</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Methode</TableHead>
                  <TableHead className="text-right">Betrag</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell><ShadcnBadge>Bezahlt</ShadcnBadge></TableCell>
                  <TableCell>Kreditkarte</TableCell>
                  <TableCell className="text-right">€250,00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV002</TableCell>
                  <TableCell><ShadcnBadge variant="outline">Ausstehend</ShadcnBadge></TableCell>
                  <TableCell>PayPal</TableCell>
                  <TableCell className="text-right">€150,00</TableCell>
                </TableRow>
              </TableBody>
            </ShadcnTable>
          </CardContent>
        </ShadcnCard>
      </div>

      {/* Theme Panel */}
      <Card>
        <Heading size="6" mb="4">Radix Themes Live Theme Panel</Heading>
        <Text size="2" color="gray" mb="4">
          Nutze das Theme Panel um das Design live anzupassen:
        </Text>
        <ThemePanel />
      </Card>
    </div>
  )
} 