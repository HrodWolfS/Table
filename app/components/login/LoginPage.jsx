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
    <div className="min-h-screen p-6 bg-gradient-to-b from-yellow-50 via-pink-100 to-blue-100">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          Qui es-tu ?
        </h1>

        {/* Liste des profils */}
        <div className="grid gap-4 mb-8">
          {users.map((user) => (
            <Card
              key={user.id}
              onClick={() => handleLogin(user.id)}
              className="cursor-pointer hover:shadow-lg transition-shadow transform hover:scale-105 bg-gradient-to-r from-green-200 to-blue-200"
            >
              <CardContent className="flex items-center p-4">
                <div>
                  <h3 className="font-bold text-purple-600">{user.name}</h3>
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
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Nouveau profil
          </button>
        ) : (
          <Card className="bg-gradient-to-r from-yellow-200 to-pink-200">
            <CardHeader>
              <CardTitle className="text-purple-600">Nouveau profil</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-purple-600">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full p-2 border-2 border-gray-200 rounded focus:border-purple-500 text-purple-600 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-purple-600">
                    Âge
                  </label>
                  <input
                    type="number"
                    value={newUser.age}
                    onChange={(e) =>
                      setNewUser((prev) => ({ ...prev, age: e.target.value }))
                    }
                    className="w-full p-2 border-2 border-gray-200 rounded focus:border-purple-500 text-purple-600 focus:outline-none"
                    required
                    min="3"
                    max="80"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    Ajouter
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition-colors"
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
