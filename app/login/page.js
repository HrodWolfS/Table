"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/Card";
import { addUser, getUsers, login } from "@/app/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", age: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  const handleLogin = (userId) => {
    login(userId);
    router.push("/");
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const user = addUser(newUser.name, parseInt(newUser.age));
    setUsers([...users, user]);
    setNewUser({ name: "", age: "" });
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Qui es-tu ?</h1>

        {/* Liste des profils */}
        <div className="grid gap-4 mb-8">
          {users.map((user) => (
            <Card
              key={user.id}
              onClick={() => handleLogin(user.id)}
              className="cursor-pointer hover:shadow-lg transition-shadow"
            >
              <CardContent className="flex items-center p-4">
                <div>
                  <h3 className="font-bold">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.age} ans</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bouton pour ajouter un nouveau profil */}
        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Nouveau profil
          </button>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Nouveau profil</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Âge</label>
                  <input
                    type="number"
                    value={newUser.age}
                    onChange={(e) =>
                      setNewUser((prev) => ({ ...prev, age: e.target.value }))
                    }
                    className="w-full p-2 border rounded"
                    required
                    min="3"
                    max="80"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                  >
                    Ajouter
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
