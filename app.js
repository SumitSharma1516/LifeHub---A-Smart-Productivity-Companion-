let tasks = [];

        function addTask() {
            const taskName = document.getElementById('taskName').value.trim();
            const taskPriority = document.getElementById('taskPriority').value;
            if (!taskName) {
                alert('Please enter a task name.');
                return;
            }

            tasks.push({ name: taskName, priority: taskPriority, completed: false });
            document.getElementById('taskName').value = '';
            renderTasks();
        }

        function toggleComplete(index) {
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
        }

        function deleteTask(index) {
            tasks.splice(index, 1);
            renderTasks();
        }

        function renderTasks() {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';

            tasks.forEach((task, index) => {
                const taskItem = document.createElement('li');
                taskItem.className = `task-item ${task.priority}`;
                if (task.completed) taskItem.style.textDecoration = 'line-through';

                taskItem.innerHTML = `
                    <span>${task.name}</span>
                    <div class="task-actions">
                        <button class="complete-btn" onclick="toggleComplete(${index})">Complete</button>
                        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                    </div>
                `;
                taskList.appendChild(taskItem);
            });

            updateProgress();
        }

        function updateProgress() {
            const progress = document.getElementById('progressBar');
            const progressText = document.getElementById('progressText');
            const totalTasks = tasks.length;
            const completedTasks = tasks.filter(task => task.completed).length;

            const percentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
            progress.style.width = `${percentage}%`;
            progressText.textContent = `Completed: ${percentage}%`;
        }