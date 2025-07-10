"use client";

import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { deleteUser, getUsers, updateUser } from "~/app/admin/users/actions";

interface User {
  id: string;
  name: string | null;
  email: string | null;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });

  const load = async (p = page) => {
    const data = await getUsers(p);
    setUsers(data.users);
    setTotal(data.total);
    setPage(p);
  };

  useEffect(() => {
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startEdit = (u: User) => {
    setEditingId(u.id);
    setForm({ name: u.name ?? "", email: u.email ?? "" });
  };
  const cancelEdit = () => setEditingId(null);
  const saveEdit = async (id: string) => {
    await updateUser(id, form);
    cancelEdit();
    await load(page);
  };
  const remove = async (id: string) => {
    await deleteUser(id);
    await load(page);
  };

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="w-32">Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                {editingId === user.id ? (
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                ) : (
                  user.name
                )}
              </TableCell>
              <TableCell>
                {editingId === user.id ? (
                  <Input
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                ) : (
                  user.email
                )}
              </TableCell>
              <TableCell className="space-x-2">
                {editingId === user.id ? (
                  <>
                    <Button size="sm" onClick={() => saveEdit(user.id)}>
                      Speichern
                    </Button>
                    <Button size="sm" variant="ghost" onClick={cancelEdit}>
                      Abbrechen
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" onClick={() => startEdit(user)}>
                      Bearbeiten
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => remove(user.id)}
                    >
                      Löschen
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between">
        <Button onClick={() => load(page - 1)} disabled={page === 1}>
          Zurück
        </Button>
        <div>
          Seite {page} / {totalPages}
        </div>
        <Button onClick={() => load(page + 1)} disabled={page >= totalPages}>
          Weiter
        </Button>
      </div>
    </div>
  );
}
