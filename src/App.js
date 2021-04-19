import React, { useRef, useState, useMemo, useCallback } from 'react';
import UserList from "./UserList";
import CreateUser from "./CreateUser";


function countActiveUsers(users){
    console.log('활성 사용자 수 세는중...');
    return users.filter(user => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username : '',
    email : '',
  });
  const { username, email } = inputs;
  const onchange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const [users, setUsers] = useState ([
    {
      id :1,
      username : 'Kim',
      email : 'piwe2004@gmail.com',
      active:true,
    },
    {
      id: 2,
      username : 'tester',
      email : 'test@example.com',
      active:true,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active:false,
    }
  ]);

  const nextId = useRef(4);

/*  const onCreate = () => {
    const user = {
      id:nextId.current,
      username,
      email,
    };
    setUsers(users.concat(user));
    setInputs({
      username:'',
      email: '',
    });
    nextId.current += 1;
  };

  const onRemove = id => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter(user => user.id !== id));
  };

  const onToggle = id => {
    setUsers(
        users.map(user =>
            user.id === id ? { ...user, active: !user.active } : user
        )
    );
  };*/
    const onCreate= useCallback(() => {
       const user = {
           id: nextId.current,
           username,
           email
       };
       setUsers(users.concat(user));
       setInputs({
           username:'',
           email:''
       });
       nextId.current += 1;
    }, [username, email]);

    const onRemove = useCallback(
        id => {
            // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
            // = user.id 가 id 인 것을 제거함
            setUsers(users.filter(user => user.id !== id));
        },
        []
    );

    const onToggle = useCallback (
    id => {
        setUsers(
            users.map(user =>
                user.id === id ? { ...user, active: !user.active } : user)
        );
    }, []);

  //const count = countActiveUsers(users);
    const count = useMemo(() => countActiveUsers(users), [users]);
      return (
          <>
            <CreateUser onCreate={onCreate} onChange={onchange} username={username} email={email}/>
            <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
            <div>활성사용자 수 : {count}</div>
          </>
      );
    }

export default App;
