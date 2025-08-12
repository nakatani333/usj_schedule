import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Show {
  id: number;
  show_name: string;
  // description: string | null;
  // status: number;
  // created_at: string;
  // updated_at: string;
}

export default function ShowList() {
  const [shows, setShows] = useState<Show[]>([]);
  // const [newTodo, setNewTodo] = useState<{ title: string; description: string }>({ title: '', description: '' });
  // const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  // Todo 一覧取得
  const getShows = useCallback(() => {
    axios.get(`${API_BASE_URL}/shows`)
      .then(res => {
        const shows = Array.isArray(res.data.data) ? res.data.data : [];
        setShows(shows);
      })
      .catch(console.error);
  }, [API_BASE_URL]);

  useEffect(() => {
    getShows();
  }, [getShows]);

  return (
    <div className="page-container">
      {/* <h1 className="section-title">➕ Todo 作成</h1>

      <div className="form-section">
        <div className="form-group">
          <label>タイトル：</label>
          <input
            type="text"
            className="input-text"
            value={newTodo.title}
            onChange={e => setNewTodo({ ...newTodo, title: e.target.value })}
          />
          {errors.title && <div className="error-text">{errors.title.join(', ')}</div>}
        </div>

        <div className="form-group">
          <label>説明：</label>
          <textarea
            className="textarea-text"
            value={newTodo.description}
            onChange={e => setNewTodo({ ...newTodo, description: e.target.value })}
          />
          {errors.description && <div className="error-text">{errors.description.join(', ')}</div>}
        </div>

        <div className="form-group">
          <button className="btn-primary" onClick={addTodo}>➕ Todo 作成</button>
        </div>
      </div> */}

      <hr />

      <h1 className="section-title">📋 show 一覧</h1>

      {!shows.length && <p>showがありません。</p>}

      <ul className="todo-list">
        {shows.map(show => (
          <li key={show.id} className="todo-card">
            <div className="todo-content">
              <p className="todo-title"><strong>{show.show_name}</strong></p>
              {/* <p className="todo-description">{todo.description}</p> */}

              {/* <div className="date-info">
                <span>作成日: {new Date(todo.created_at).toLocaleString()}</span>
                <span>更新日: {new Date(todo.updated_at).toLocaleString()}</span>
              </div> */}

              {/* <div className="status-buttons">
                {[0, 1, 2].map(s => {
                  const isActive = todo.status == s;
                  return (
                    <button
                      key={s}
                      onClick={() => updateStatus(todo.id, s)}
                      className={`status-button ${isActive
                        ? ['status-active-not-started', 'status-active-in-progress', 'status-active-done'][s]
                        : 'status-inactive'
                        }`}
                    >
                      {['未着手', '進行中', '完了'][s]}
                    </button>
                  );
                })}
              </div> */}
            </div>

            {/* <div className="todo-actions">
              <Link to={`/edit/${todo.id}`}>
                <button className="btn-secondary">✏️ 編集</button>
              </Link>
              <button className="btn-secondary" onClick={() => deleteTodo(todo.id)}>🗑️ 削除</button>
            </div> */}
          </li>
        ))}
      </ul>
    </div>
  );

}
