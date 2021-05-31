package org.proyecto.retroshare.repositories;

import org.proyecto.retroshare.domain.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long>{

}
